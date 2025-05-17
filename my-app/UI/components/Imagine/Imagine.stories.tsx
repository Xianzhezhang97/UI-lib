// src/components/SmartImage.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { Imagine } from "./Imagine";

const meta: Meta<typeof Imagine> = {
  title: "Components/Imagine",
  component: Imagine,
  tags: ["autodocs"],
  argTypes: {
    width: { control: "number" },
    height: { control: "number" },
    lazy: { control: "boolean" },
    withSkeleton: { control: "boolean" },
    showProgress: { control: "boolean" },
    placeholder: { control: "text" },
    fallback: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Imagine>;

const demoImage = "https://picsum.photos/id/237/600/400";
const brokenImage = "https://not-exist-domain.com/image.jpg";
const blurPlaceholder = "https://picsum.photos/id/237/20/20?blur";

export const Default: Story = {
  args: {
    src: demoImage,
    alt: "正常图片",
    width: 600,
    height: 400,
    lazy: false,
    withSkeleton: true,
    showProgress: false,
  },
};

export const WithSkeletonAndLazy: Story = {
  args: {
    src: demoImage,
    alt: "懒加载 + 骨架屏",
    width: 600,
    height: 400,
    lazy: true,
    withSkeleton: true,
    showProgress: false,
  },
};

export const WithPlaceholder: Story = {
  args: {
    src: demoImage,
    alt: "模糊占位图",
    width: 600,
    height: 400,
    lazy: true,
    withSkeleton: false,
    placeholder: blurPlaceholder,
  },
};

export const WithFallbackImage: Story = {
  args: {
    src: brokenImage,
    alt: "加载失败图",
    width: 600,
    height: 400,
    fallback: "/fallback.png", // 你项目中的默认图路径
  },
};

export const WithProgressBar: Story = {
  args: {
    src: demoImage,
    alt: "加载进度条",
    width: 600,
    height: 400,
    showProgress: true,
    withSkeleton: false,
  },
};
