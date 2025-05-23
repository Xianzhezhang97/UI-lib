import { cn } from '@/UI/utils/cn';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

export interface WaterfallLayoutProps {
  children: ReactNode[];
  gap?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  className?: string;
  itemClassName?: string;
  minColumnWidth?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  breakpoints?: { sm?: number; md?: number; lg?: number; xl?: number };
}

export const WaterfallLayout: React.FC<WaterfallLayoutProps> = ({
  children,
  gap = { sm: 2, md: 4, lg: 6, xl: 8 },
  className = '',
  itemClassName = '',
  minColumnWidth = { sm: 300, md: 300, lg: 300, xl: 300 },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);
  const [columnWrapperStyle, setColumnWrapperStyle] = useState<React.CSSProperties>({});
  const [itemStyles, setItemStyles] = useState<React.CSSProperties[]>([]);
  const resizeObserverRef = useRef<ResizeObserver>();
  const itemRefs = useRef<HTMLElement[]>([]);

  // 计算列数和间隙
  const calculateLayout = useMemo(() => {
    return (width: number) => {
      const numericGap = typeof gap === 'number' ? gap : 
        width >= 1280 ? (gap as any).xl || 32 :
        width >= 1024 ? (gap as any).lg || 24 :
        width >= 768 ? (gap as any).md || 16 :
        (gap as any).sm || 8;

      const numericMinWidth = typeof minColumnWidth === 'number' ? minColumnWidth : 
        width >= 1280 ? (minColumnWidth as any).xl ||     350 :
        width >= 1024 ? (minColumnWidth as any).lg ||     350 :
        width >= 768 ? (minColumnWidth as any).md ||      350 :
        (minColumnWidth as any).sm ||     350;

      const columnCount = Math.max(1, Math.floor(width / (numericMinWidth + numericGap)));
      const columnWidth = (width - (columnCount - 1) * numericGap) / columnCount;

      return {
        columns: columnCount,
        gap: numericGap,
        columnWidth,
      };
    };
  }, [gap, minColumnWidth]);

  // 瀑布流布局核心算法
  const positionItems = () => {
    if (!containerRef.current) return;

    const { columns, gap, columnWidth } = calculateLayout(containerRef.current.offsetWidth);
    setColumns(columns);

    const columnHeights = new Array(columns).fill(0);
    const newItemStyles: React.CSSProperties[] = [];

    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const itemHeight = item.offsetHeight;
      const minHeight = Math.min(...columnHeights);
      const columnIndex = columnHeights.indexOf(minHeight);

      newItemStyles[index] = {
        position: 'absolute',
        width: columnWidth,
        left: columnIndex * (columnWidth + 2 * gap),
        top: minHeight + (minHeight > 0 ? gap : 0),
      };

      columnHeights[columnIndex] += itemHeight + gap;
    });

    setColumnWrapperStyle({
      position: 'relative',
      height: Math.max(...columnHeights),
    });
    
    setItemStyles(newItemStyles);
  };

  // 响应式处理
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      positionItems();
    };

    // 初始化ResizeObserver
    resizeObserverRef.current = new ResizeObserver(debounce(positionItems, 100));
    resizeObserverRef.current.observe(containerRef.current);

    // 初始定位
    positionItems();

    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, [children]);

  // 子项元素处理
  const itemsWithRef = useMemo(() => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return null;

      return React.cloneElement(child as React.ReactElement, {
        style: { ...child.props.style, ...itemStyles[index] },
        ref: (el: HTMLElement) => (itemRefs.current[index] = el),
        className: cn(child.props.className, itemClassName),
      });
    });
  }, [children, itemStyles, itemClassName]);

  return (
    <div
      ref={containerRef}
      className={cn('w-full', className)}
      style={columnWrapperStyle}
    >
      {itemsWithRef}
    </div>
  );
};

// 防抖函数
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}