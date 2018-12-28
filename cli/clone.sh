#!/bin/bash
num=("1" "2" "3")
pathname="pages"
template=("cli/page")

# 复制page
function inputPageName(){
  while [ -z $pageName ]
  do 
    printf "\033[32mplease input page Name : \033[0m"
    read pageName
  done
  targetPath="$pathname/$pageName"
  if [ -d $targetPath ]
    then
      echo "\033[31mwarn: page [$pageName] is exist!\033[0m"
  else
    # cp 复制模版到新建路径
    cp -iR ${template[0]} $targetPath 
    for file in `ls ./$template`
    do
      suffixName=${file#*.}
      lastName="$pageName.$suffixName"
      # mv 文件重命名
      mv  "$targetPath/$file" "$targetPath/$lastName"
    done 
  echo "page [$pageName] create complete!"
  fi
}

# 复制文件的函数
function copyFile(){
  # 复制page
  if [ $type == ${num[0]} ]
    then 
      inputPageName $type
  fi
}

# -z 检查字符串长度是否为0
while [ -z $type ] || [[ $type != ${num[0]} && $type != ${num[1]} && $type != ${num[2]}  ]]
do
  echo "\033[32mplease input your file type: \033[0m"
  echo "【1】page"
  echo "【2】compoment"
  echo "【3】package"
  read type
done
# echo "your select is $type"
copyFile

# if [ $type != "1" ]
#   then 
#     echo "不是1"
# fi

# a=1
# b=1
# if [ $a == $b ]
# then
#    echo "a 等于 b"
# fi

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

