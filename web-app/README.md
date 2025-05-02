# Clone Itaú/Nubank - Aplicação Web

Este projeto é uma aplicação web full-stack que simula funcionalidades básicas de um banco digital, com um frontend inspirado no layout do Nubank e utilizando a paleta de cores do Itaú.

## Arquitetura

*   **Frontend:**
    *   Tecnologia: React (Vite + TypeScript)
    *   Estilização: Tailwind CSS + shadcn/ui
    *   Roteamento: React Router DOM
    *   Comunicação API: Axios
    *   Gerenciamento de Estado (Autenticação): React Context API
    *   Diretório: `/frontend`
*   **Backend:**
    *   Tecnologia: Flask (Python)
    *   Banco de Dados: SQLite (arquivo `database.db` criado na raiz do backend)
    *   API: RESTful
    *   Autenticação: Flask-Login, Flask-Bcrypt
    *   ORM: Flask-SQLAlchemy
    *   Diretório: `/backend`

## Funcionalidades Implementadas

*   Cadastro de Usuário
*   Login/Logout
*   Dashboard com exibição de saldo e últimas transações
*   Histórico completo de transações
*   Transferência entre contas (simulada)

## Como Rodar Localmente

### Pré-requisitos

*   Node.js e pnpm (para o frontend)
*   Python 3.11+ e pip (para o backend)

### Backend

1.  Navegue até o diretório do backend:
    ```bash
    cd backend
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

### Frontend

1.  Em um novo terminal, navegue até o diretório do frontend:
    ```bash
    cd frontend
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

## Observações

*   O banco de dados SQLite (`database.db`) será criado automaticamente no diretório `backend` na primeira vez que o servidor backend for iniciado.
*   A aplicação utiliza cookies para gerenciamento de sessão (via Flask-Login).
*   As cores do frontend são baseadas na paleta do Itaú (laranja como principal), configuradas no `tailwind.config.js`.

