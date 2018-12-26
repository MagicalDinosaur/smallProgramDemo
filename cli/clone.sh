#!/bin/bash

pathname="pages"

echo "\033[31m please select your file type: \033[0m"
echo "【1】page"
echo "【2】compoment"
echo "【3】package"
echo "\033[4A 光标上移4行 \033[0m"
read type

# -z 检查字符串长度是否为0
while [ -z $type]
do
  echo "please select your file type:"
  echo "【1】page"
  echo "【2】compoment"
  echo "【3】package"
  read type
done
echo "your select is $type"

# else
#   echo "your select is $type"
#   targetPath="$pathname/$name"
#   if [ -d $targetPath ]
#   then
#     echo "page name exist"
#   else
#     cp -iR $template $targetPath
#     echo "complete!"
#   fi
# fi                                                                                        

