YELLOW='\033[1;33m'
NC='\033[0m'

print () {
  echo "${YELLOW}$1${NC}"
}

NODE_ENV=production npx webpack

print "move index.html to dist"
mkdir -p dist
cp docs/index.html dist/
cd dist

print "removing new lines"
tr -d '\n' < index.html > newlineless_index.html

print "extracting javascript"
sed -E 's/.*\<script\>(.*)\<\/script\>(.*)/\1/' newlineless_index.html > js.js

print "road roller"
npx roadroller js.js -o output.js

sed -E 's/(.*)\<script\>.*/\1/' index.html > template.html

rm index.html

echo "<script>" >> template.html
cat template.html output.js > index.html
echo "</script>" >> index.html

print "zip final build"
rm index.html.zip
ect -zip -9 index.html

print "src directory total size"
du -sh ../src | awk '{print $1}'

print "final size"
ls -hl index.html.zip | awk -F ' ' '{ print $5 }'

print "remaining bytes"
expr 13312 - $(ls -l index.html.zip | awk -F ' ' '{ print $5 }')
