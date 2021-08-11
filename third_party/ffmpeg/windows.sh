apt-get install subversion curl texinfo g++ bison flex cvs yasm automake libtool autoconf gcc cmake git make pkg-config zlib1g-dev mercurial unzip pax nasm -y
wget http://zeranoe.com/scripts/mingw_w64_build/mingw-w64-build-3.6.7

chmod 755 ./mingw-w64-build-3.6.7
bash ./mingw-w64-build-3.6.7

export PATH="/build/mingw-w64-x86_64/bin:$PATH"
export PKG_CONFIG_PATH="/build/mingw-w64-x86_64/x86_64-w64-mingw32/lib/pkgconfig"
# ===== libiconv-1.14 =====
cd ./x86_64/libiconv-1.14

export CFLAGS=-O2

./configure --host=x86_64-w64-mingw32 --prefix=/build/mingw-w64-x86_64/x86_64-w64-mingw32 --disable-shared --enable-static

make -j 8
make install

unset CFLAGS

cd ../

# ===== libiconv-1.14 =====
cd ./x86_64/zlib-1.2.8

CC=x86_64-w64-mingw32-gcc AR=x86_64-w64-mingw32-ar RANLIB=x86_64-w64-mingw32-ranlib ARFLAGS=rcs ./configure --prefix=./mingw-w64-x86_64/x86_64-w64-mingw32 --static

make -j 8
make install

cd ../

# ===== SDL-1.2.15 =====
cd ./x86_64/SDL-1.2.15

export CFLAGS=-DDECLSPEC=

./configure --host=x86_64-w64-mingw32 --prefix=./mingw-w64-x86_64/x86_64-w64-mingw32 --disable-shared --enable-static

make -j 8
make install

unset CFLAGS

sed -i.bak "s/-mwindows//" "./mingw-w64-x86_64/x86_64-w64-mingw32/lib/pkgconfig/sdl.pc"

sed -i.bak "s/-mwindows//" "./mingw-w64-x86_64/x86_64-w64-mingw32/bin/sdl-config"

cp "./mingw-w64-x86_64/x86_64-w64-mingw32/bin/sdl-config" "./mingw-w64-x86_64/bin/x86_64-w64-mingw32-sdl-config"
cd ../

# ===== lame-3.99.5 =====
cd ./x86_64/lame-3.99.5
make clean

./configure --host=x86_64-w64-mingw32 --prefix=./mingw-w64-x86_64/x86_64-w64-mingw32 --disable-shared --enable-static --enable-nasm

make -j 8
make install
cd ../

# ===== x264-snapshot-* =====
cd ./x86_64/x264-snapshot-*
make clean

./configure --host=x86_64-w64-mingw32 --enable-static --cross-prefix=./mingw-w64-x86_64/bin/x86_64-w64-mingw32- --prefix=./mingw-w64-x86_64/x86_64-w64-mingw32 --enable-strip --disable-lavf --disable-swscale

make -j 8
make install

# ===== librsvg-2.2 =====

git clone https://gitlab.gnome.org/GNOME/librsvg.git
cd ./librsvg

./configure --host=x86_64-w64-mingw32 --prefix=./mingw-w64-x86_64/x86_64-w64-mingw32 --disable-shared --enable-static

cd ../

# ===== ffmpeg-* =====
cd ./x86_64/ffmpeg-*
make clean

./configure --arch=x86_64 --target-os=mingw32 --enable-librsvg --cross-prefix=./mingw-w64-x86_64/bin/x86_64-w64-mingw32- --disable-w32threads --enable-runtime-cpudetect --enable-gpl --enable-version3 --enable-static --disable-shared --enable-libx264 --extra-libs=-lstdc++ --enable-libmp3lame --enable-iconv --enable-zlib --extra-cflags= --prefix="./mingw-w64-x86_64/x86_64-w64-mingw32" --pkg-config=pkg-config

make -j 8

make install
