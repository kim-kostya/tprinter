npm run build

cp ./docker/* ./build/
cp ./docker/.dockerignore ./build/

docker build -t litepas-me/litebase .