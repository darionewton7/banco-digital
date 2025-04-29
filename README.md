# Simulado de um Banco Digital - Aplicativo Mobile

## 🌍 Visão Geral

Este projeto é um aplicativo mobile de banco digital, desenvolvido em **React Native** utilizando **TypeScript**, com suporte a plataformas **Android** e **iOS**. A arquitetura do projeto foi pensada para ser modular, escalável e de fácil manutenção.

O aplicativo inclui telas de:
- Login
- Dashboard (resumo financeiro)
- Histórico de transações
- Perfil do usuário
- Transferências bancárias


## 🚀 Tecnologias Utilizadas

- **React Native** - Base para desenvolvimento mobile multiplataforma
- **TypeScript** - Tipagem estática para maior robustez
- **React Navigation** - Gerenciamento de navegação entre telas
- **Styled Components** - Estilização com componentes isolados (opcional, usado no `globalStyles`)
- **Jest** - Testes unitários
- **Gradle** (Android) - Build do app Android
- **Xcode** (iOS) - Build do app iOS


## 🛠️ Estrutura do Projeto

```bash
banco-digital-main/
├── App.tsx                # Arquivo principal de entrada do app
├── src/
│   ├── components/        # Componentes reutilizáveis (Button, Header, Input)
│   ├── navigation/        # Gerenciamento das rotas e navegação (AppNavigator)
│   ├── screens/           # Telas principais do aplicativo
│   ├── styles/            # Estilos globais e temas
├── android/               # Projeto nativo Android (Gradle)
├── ios/                   # Projeto nativo iOS (Xcode)
├── __tests__/             # Testes automatizados com Jest
├── .eslintrc.js           # Configuração do ESLint
├── tsconfig.json          # Configuração do TypeScript
├── package.json           # Dependências e scripts NPM
└── README.md              # Documentação do projeto
```


## 🎓 Principais Pastas

### src/components/
Componentes visuais reutilizáveis:
- **Button.tsx**: Botão customizado.
- **Header.tsx**: Cabeçalho de tela.
- **Input.tsx**: Campo de entrada de dados.

### src/navigation/
Gerencia toda a navegação do aplicativo, utilizando o React Navigation. 

### src/screens/
Contém cada tela específica do app:
- **LoginScreen.tsx**
- **DashboardScreen.tsx**
- **HistoryScreen.tsx**
- **ProfileScreen.tsx**
- **TransferScreen.tsx**

### src/styles/
Centraliza estilos globais e temas personalizados para o app.


## 📊 Fluxo da Aplicação

1. Usuário acessa o **Login**
2. Após login, navega para o **Dashboard**
3. Pode visualizar o **Histórico**, gerenciar o **Perfil**, ou fazer **Transferências**
4. Navegação baseada em Stack (empilhamento de telas)


## 📅 Scripts NPM disponíveis

```bash
npm install         # Instala dependências
npm start           # Inicia o Metro Bundler
npm run android     # Builda e roda no Android
npm run ios         # Builda e roda no iOS (MacOS necessário)
npm test            # Executa os testes unitários
```


## 📚 Testes

- Utiliza **Jest** para testes unitários
- Testes de componentes em `__tests__/`

Para rodar os testes:
```bash
npm test
```


## 🌐 Requisitos para rodar o projeto

- Node.js >= 14.x
- Yarn ou NPM
- Android Studio (para Android)
- Xcode (para iOS - MacOS)
- Emulador Android ou iOS configurado


## ✨ Como iniciar o projeto localmente

```bash
# 1. Clone o repositório
https://github.com/seu-usuario/seu-repo.git

# 2. Instale as dependências
npm install

# 3. Rode o Metro Bundler
npm start

# 4. Rode no Android ou iOS
npm run android
# ou
npm run ios
```


---

> 👋 Projeto desenvolvido como estudo de aplicações mobile financeiras. Sinta-se à vontade para usar como base e expandir!

