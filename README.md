# Fastlane Marques

Sou engenheiro DevOps e o app tem como objetivo ser um portfólio demonstrativo dos meus conhecimentos de Fastlane. O Fastlane é responsável por buildar e publicar o app tanto na App Store quanto na Google Play Store.

## Sobre o projeto

O **Marques** é um aplicativo mobile multiplataforma (Android e iOS) construído com React Native. A tela inicial exibe o nome do desenvolvedor, uma imagem de boas-vindas e oferece ao usuário:

- **Tema claro/escuro** — alternância entre modo claro e escuro via switch
- **Link para LinkedIn** — botão que abre o perfil profissional no LinkedIn
- **Avaliação do app** — opções "Gostei" ou "Não gostei" que levam a telas de feedback distintas

O fluxo de navegação leva o usuário que gostou para uma tela de agradecimento, e o que não gostou para outra tela com resposta humorística.

## Tecnologias

- **React Native** 0.80
- **TypeScript**
- **React Navigation** (Stack Navigator)
- **Fastlane** — automação de build e publicação na App Store e Google Play Store

## Estrutura do app

| Tela        | Descrição                                               |
|------------|----------------------------------------------------------|
| Home       | Tela principal com imagem, toggle de tema e botão LinkedIn |
| You Are Amazing! | Tela exibida quando o usuário clica em "Gostei"     |
| Ignored!   | Tela exibida quando o usuário clica em "Não gostei"      |

## Pré-requisitos

- **Node.js** >= 18
- **React Native** — ambiente configurado conforme [documentação oficial](https://reactnative.dev/docs/set-up-your-environment)
- **Android Studio** (para Android)
- **Xcode** (para iOS, apenas macOS)

## Como rodar

1. Instale as dependências:
   ```bash
   make install
   ```

2. Execute o app Android:
   ```bash
   make start-android
   ```

3. (Opcional) Para parar o emulador:
   ```bash
   make stop-android
   ```

## Variáveis do Fastlane

As seguintes variáveis são necessárias para executar as lanes do Fastlane:

### Variáveis de ambiente (lane `defs_test`)

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `VERSION_NAME` | Não | Versão do app (ex: `1.0.0`). Se omitida, usa o valor do `package.json`. |
| `VERSION_CODE` | Sim | Código numérico da versão (ex: `1`, `2`, `15`). |
| `PACKAGE_NAME` | Condicional | Identificador do pacote (ex: `com.fastlanemarques.dev`). Usado quando `PACKAGE_NAME_BASE` não está definido. |
| `PACKAGE_NAME_BASE` | Condicional | Base do identificador (ex: `com.fastlanemarques`). Usado junto com `FLAVOR` para gerar `PACKAGE_NAME_FINAL`. |
| `FLAVOR` | Condicional | Nome do flavor (ex: `dev`, `prod`). Usado quando `PACKAGE_NAME_BASE` está definido; nesse caso `PACKAGE_NAME_FINAL` = `PACKAGE_NAME_BASE.FLAVOR`. |

**Exemplo de uso:**
```bash
export VERSION_NAME="1.0.0"
export VERSION_CODE="16"
export PACKAGE_NAME="com.fastlanemarques.dev"
cd android && bundle exec fastlane defs_test
```

### Assinatura (Android)

O build de release requer o arquivo `android/keystore.properties` com:

| Propriedade | Descrição |
|-------------|-----------|
| `storeFile` | Caminho do arquivo keystore (ex: `fastlane-marques-key.keystore`) |
| `storePassword` | Senha do keystore |
| `keyAlias` | Alias da chave |
| `keyPassword` | Senha da chave |

### Google Play Store

Para publicação na Play Store, é necessário:

- **Appfile** (`android/fastlane/Appfile`): configurar `json_key_file` com o caminho do arquivo JSON da conta de serviço do Google Cloud.
- **Arquivo JSON**: credenciais da conta de serviço com permissão para publicar na Play Console (obter em [Google Cloud Console](https://console.cloud.google.com)).

## Deploy (Fastlane)

O projeto inclui Fastlane para build e publicação do app na App Store (iOS) e Google Play Store (Android). Principais lanes:

- **deploy_google_play_store** — gera o bundle para publicação na Google Play
- **release_test** — build de debug para testes
- **defs_test** — build de release com versionamento customizado via variáveis de ambiente

```bash
cd android
bundle exec fastlane deploy_google_play_store
```

## Licença

Projeto privado.
