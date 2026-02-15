.PHONY: help install android clean clean-all

help:
	@echo "Comandos disponíveis:"
	@echo ""
	@echo "  make help       - Exibe esta mensagem de ajuda"
	@echo "  make install    - Instala as dependências (npm install)"
	@echo "  make android    - Instala dependências e roda o app Android (npm install && npm run android)"
	@echo "  make clean      - Remove caches e arquivos temporários (mantém node_modules)"
	@echo "  make clean-all  - Remove tudo inclusive node_modules e package-lock.json"
	@echo ""

install: package.json
	npm install

start-android: install
	npm install && npm run android -- --mode=devDebug

stop-android:
	adb emu kill

clean:
	rm -rf android/build android/app/build android/.gradle android/.bundle
	rm -rf android/.kotlin android/app/.cxx
	rm -rf build
	rm -rf ios/build ios/Pods ios/.xcode.env.local
	rm -rf .idea
	rm -rf $$TMPDIR/metro-* $$TMPDIR/haste-map-* $$TMPDIR/react-* 2>/dev/null || true
	rm -f .eslintcache .metro-health-check* 2>/dev/null || true
	rm -rf coverage 2>/dev/null || true
	@echo "Limpeza concluída."

clean-all: clean
	rm -rf node_modules
	rm -f package-lock.json 2>/dev/null || true
	npm cache clean --force
	@echo "Limpeza completa concluída. Execute 'make install' para reinstalar dependências."
