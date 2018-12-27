#!/bin/bash

pathname="pages"
nums=[1,2,3]
num=1

# -z 检查字符串长度是否为0
while [ -z $type] || [ "$type"!="1" ]
do
  echo "\033[31m please select your file type: \033[0m"
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

