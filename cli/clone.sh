#!/bin/bash
num=("1" "2" "3")
pathname=("pages" "component" "packages")
template=("cli/page" "cli/component" "cli/page")

# 复制page函数
function copyFile(){
  while [ -z $pageName ]
  do 
    printf "\033[32mplease input page Name : \033[0m"
    read pageName
  done
  targetPath="${pathname[$1]}/$pageName"
  if [ -d $targetPath ]
    then
      echo "\033[31mwarn: page [$pageName] is exist!\033[0m"
  else
    # cp 复制模版到新建路径
    cp -iR ${template[$1]} $targetPath 
    for file in `ls ./${template[$1]}`
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
function choiceType(){
  # 复制page
  if [ $type == ${num[0]} ]
    then 
      copyFile 0
  elif [ $type == ${num[1]} ]
    then
      copyFile 1
  elif [ $type == ${num[2]} ]
    then
      copyFile 2
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

choiceType
                                                                                 

