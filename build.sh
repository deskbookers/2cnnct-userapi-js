CWD=$(cd $(dirname $0); echo $(pwd))
BUILD="$CWD/build/UserAPI.js"
FILES="$CWD/src/axios.min.js $CWD/src/php.js $CWD/src/crypto.js $CWD/src/isaac.js $CWD/src/bCrypt.js $CWD/src/UserAPI.js"

cat $FILES > "$BUILD"
