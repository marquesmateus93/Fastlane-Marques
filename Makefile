ACT_PIPELINE_PATH	= .github/act/pipelines/deploy-android.yaml
ACT_JSON_PATH		= .github/act/workflow_dispatch_event.json
ACT_SECRETS_PATH	= .github/act/secrets

help:
	@echo "Available commands:"
	@echo ""
	@echo "  make help       			- Show this help message."
	@echo "  make helinstall   			- Dependencies install."
	@echo "  make start-android			- Install dependencies and run the Android app."
	@echo "  make stop-android			- Kill the Android emulator process."
	@echo "  make clean      			- Remove caches and temporary files (keeps node_modules)."
	@echo "  make clean-all  			- Remove everything including node_modules."
	@echo "  make act-deploy-android  	- Runs the local pipeline for Android deploy by Act."
	@echo ""

install: package.json
	npm install

start-android: install
	npm run android -- --mode=devDebug

stop-android:
	adb emu kill

clean:
	@echo "Removing Android build artifacts and caches (Gradle, Kotlin, NDK)..."
	rm -rf android/build android/app/build android/.gradle android/.bundle
	rm -rf android/.kotlin android/app/.cxx
	@echo "Removing general build directory..."
	rm -rf build
	@echo "Removing iOS build artifacts and dependencies (Pods, Xcode)..."
	rm -rf ios/build ios/Pods ios/.xcode.env.local
	@echo "Removing IDE configuration files (JetBrains)..."
	rm -rf .idea
	@echo "Clearing Metro Bundler temporary caches..."
	rm -rf $$TMPDIR/metro-* $$TMPDIR/haste-map-* $$TMPDIR/react-* 2>/dev/null || true
	@echo "Removing lint and Metro health check caches..."
	rm -f .eslintcache .metro-health-check* 2>/dev/null || true
	@echo "Removing test coverage reports..."
	rm -rf coverage 2>/dev/null || true
	@echo "Cleanup completed."

clean-all: clean
	@echo "Removing Node dependencies (node_modules)..."
	rm -rf node_modules
	@echo "Removing additional Android Bundler cache..."
	rm -rf android/.bundle
	@echo "Clearing NPM cache (forced)..."
	npm cache clean --force
	@echo "Full cleanup completed. Run 'make install' to reinstall dependencies."

act-deploy-android:
	@echo "Act Environment Variables:"
	@echo "ACT_PIPELINE_PATH	= ${ACT_PIPELINE_PATH}"
	@echo "ACT_JSON_PATH		= ${ACT_JSON_PATH}"
	@echo "ACT_SECRETS_PATH 	= ${ACT_SECRETS_PATH}"
	@act \
	workflow_dispatch \
	-W \
	$(ACT_PIPELINE_PATH) \
	-e \
	$(ACT_JSON_PATH) \
	--secret-file \
	$(ACT_SECRETS_PATH)