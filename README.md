# Banco Digital - Aplicações Mobile e Web

Este repositório contém duas aplicações que simulam funcionalidades de um banco digital:

1.  **Aplicativo Mobile (React Native):** Descrito na seção abaixo.
2.  **Aplicação Web (React + Flask):** Descrita na seção "Aplicação Web".

---

## 📱 Aplicativo Mobile (React Native)

### 🌍 Visão Geral

Este projeto é um aplicativo mobile de banco digital, desenvolvido em **React Native** utilizando **TypeScript**, com suporte a plataformas **Android** e **iOS**. A arquitetura do projeto foi pensada para ser modular, escalável e de fácil manutenção.

O aplicativo inclui telas de:
- Login
- Dashboard (resumo financeiro)
- Histórico de transações
- Perfil do usuário
- Transferências bancárias

### 🚀 Tecnologias Utilizadas

- **React Native** - Base para desenvolvimento mobile multiplataforma
- **TypeScript** - Tipagem estática para maior robustez
- **React Navigation** - Gerenciamento de navegação entre telas
- **Styled Components** - Estilização com componentes isolados (opcional, usado no `globalStyles`)
- **Jest** - Testes unitários
- **Gradle** (Android) - Build do app Android
- **Xcode** (iOS) - Build do app iOS

### 🛠️ Estrutura do Projeto (Mobile)

```bash
BancoDigitalApp/
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
└── README.md              # Documentação específica do app mobile (se houver)
```

(Para mais detalhes sobre o aplicativo mobile, veja o README dentro da pasta `BancoDigitalApp` se aplicável ou o histórico de commits anteriores).

---

## 💻 Aplicação Web (React + Flask)

Esta aplicação web full-stack simula funcionalidades básicas de um banco digital, com um frontend inspirado no layout do Nubank e utilizando a paleta de cores do Itaú.

### Arquitetura (Web)

*   **Frontend:**
    *   Tecnologia: React (Vite + TypeScript)
    *   Estilização: Tailwind CSS + shadcn/ui
    *   Roteamento: React Router DOM
    *   Comunicação API: Axios
    *   Gerenciamento de Estado (Autenticação): React Context API
    *   Diretório: `/web-app/frontend`
*   **Backend:**
    *   Tecnologia: Flask (Python)
    *   Banco de Dados: SQLite (arquivo `database.db` criado na raiz do backend)
    *   API: RESTful
    *   Autenticação: Flask-Login, Flask-Bcrypt
    *   ORM: Flask-SQLAlchemy
    *   Diretório: `/web-app/backend`

### Funcionalidades Implementadas (Web)

*   Cadastro de Usuário
*   Login/Logout
*   Dashboard com exibição de saldo e últimas transações
*   Histórico completo de transações
*   Transferência entre contas (simulada)

### Como Rodar Localmente (Web)

#### Pré-requisitos

*   Node.js e pnpm (para o frontend)
*   Python 3.11+ e pip (para o backend)

#### Backend

1.  Navegue até o diretório do backend:
    ```bash
    cd web-app/backend
    ```
2.  (Opcional, se o ambiente virtual `venv` não existir) Crie e ative um ambiente virtual:
    ```bash
    python -m venv venv
    source venv/bin/activate # Linux/macOS
    # venv\Scripts\activate # Windows
    ```
3.  Ative o ambiente virtual (se já existir):
    ```bash
    source venv/bin/activate # Linux/macOS
    # venv\Scripts\activate # Windows
    ```
4.  Instale as dependências:
    ```bash
    pip install -r requirements.txt
    ```
5.  Inicie o servidor Flask:
    ```bash
    python src/main.py
    ```
    O backend estará rodando em `http://localhost:5000`.

#### Frontend

1.  Em um novo terminal, navegue até o diretório do frontend:
    ```bash
    cd web-app/frontend
    ```
2.  Instale as dependências:
    ```bash
    pnpm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    pnpm dev
    ```
    O frontend estará acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

### Como Rodar com Docker (Web)

#### Pré-requisitos

*   Docker e Docker Compose instalados.

#### Execução

1.  Na raiz do repositório (onde está o arquivo `docker-compose.yml`), execute o seguinte comando:
    ```bash
    docker-compose up --build
    ```
    *   O `--build` é necessário na primeira vez ou se você modificar os Dockerfiles ou o código.
    *   Para rodar em segundo plano, adicione a flag `-d`:
        ```bash
        docker-compose up --build -d
        ```
2.  A aplicação frontend estará acessível em `http://localhost:8080`.
3.  O backend estará rodando na porta 5000, mas geralmente é acessado pelo frontend através da rede interna do Docker (`http://backend:5000`).

Para parar os contêineres:
```bash
docker-compose down
```

#### Observações (Docker)

*   O banco de dados SQLite (`database.db`) é montado como um volume no arquivo `docker-compose.yml`, persistindo os dados fora do contêiner backend no diretório `web-app/backend/database.db`.
*   O frontend é servido via Nginx na porta 80 dentro do contêiner, que é mapeada para a porta 8080 no seu host.

---

> 👋 Projeto desenvolvido como estudo de aplicações financeiras. Sinta-se à vontade para usar como base e expandir!

