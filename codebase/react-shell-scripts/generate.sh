set -e
for i in {1..6}
do
  cd /Applications/XAMPP/htdocs/vuexy-admin/vuexy-react-template/react-shell-scripts
	node replace.js demo-$i
	cd ..
	yarn build
	mv build demo-$i
	zip -r demo-$i.zip demo-$i
	rm -rf demo-$i
  cd react-shell-scripts
  node reset.js
  cd ..
done
