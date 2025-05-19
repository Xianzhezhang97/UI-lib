#!/bin/bash

# 查找所有的 .stories.tsx 文件
find ./UI -name "*.stories.tsx" | while read file; do
  # 检查文件是否已经导入了 React
  if ! grep -q "import React from 'react';" "$file"; then
    # 在文件的第一行添加 React 导入
    sed -i '' '1s/^/import React from '\''react'\'';\n/' "$file"
    echo "Added React import to $file"
  else
    echo "React import already exists in $file"
  fi
done

echo "Done adding React imports to all story files."
