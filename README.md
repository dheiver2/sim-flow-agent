<p align="center">
  <img src="apps/sim/public/static/sim.png" alt="Logo do Mangaba Flow" width="500"/>
</p>

<p align="center">
  <a href="https://www.apache.org/licenses/LICENSE-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="Licença: Apache-2.0"></a>
  <a href="https://discord.gg/Hr4UWYEcTT"><img src="https://img.shields.io/badge/Discord-Entrar%20no%20Servidor-7289DA?logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://x.com/simdotai"><img src="https://img.shields.io/twitter/follow/simstudioai?style=social" alt="Twitter"></a>
  <a href="https://github.com/simstudioai/sim/pulls"><img src="https://img.shields.io/badge/PRs-bem%20vindos-brightgreen.svg" alt="PRs bem-vindos"></a>
  <a href="https://docs.sim.ai"><img src="https://img.shields.io/badge/Docs-visitar%20documentação-blue.svg" alt="Documentação"></a>
</p>

<p align="center">
  <strong>Mangaba Flow</strong> é uma plataforma leve e amigável para construir workflows de agentes de IA.
</p>

<p align="center">
  <img src="apps/sim/public/static/demo.gif" alt="Demo do Mangaba Flow" width="800"/>
</p>

## Primeiros Passos

1. Use nossa [versão hospedada na nuvem](https://sim.ai)
2. Hospede você mesmo usando um dos métodos abaixo

## Opções de Auto-hospedagem

### Opção 1: Pacote NPM (Mais Simples)

A forma mais fácil de executar o Mangaba Flow localmente é usando nosso [pacote NPM](https://www.npmjs.com/package/simstudio?activeTab=readme):

```bash
npx simstudio
```

Após executar estes comandos, abra [http://localhost:3000/](http://localhost:3000/) no seu navegador.

#### Opções

- `-p, --port <porta>`: Especifique a porta para executar o Mangaba Flow (padrão: 3000)
- `--no-pull`: Pule o download das imagens Docker mais recentes

#### Requisitos

- Docker deve estar instalado e executando na sua máquina

### Opção 2: Docker Compose

```bash
# Clone o repositório
git clone https://github.com/simstudioai/sim.git

# Navegue para o diretório do projeto
cd sim

# Inicie o Mangaba Flow
docker compose -f docker-compose.prod.yml up -d
```

Acesse a aplicação em [http://localhost:3000/](http://localhost:3000/)

#### Usando Modelos Locais com Ollama

Execute o Mangaba Flow com modelos de IA locais usando [Ollama](https://ollama.ai) - nenhuma API externa necessária:

```bash
# Inicie com suporte a GPU (baixa automaticamente o modelo gemma3:4b)
docker compose -f docker-compose.ollama.yml --profile setup up -d

# Para sistemas apenas com CPU:
docker compose -f docker-compose.ollama.yml --profile cpu --profile setup up -d
```

Aguarde o modelo ser baixado, então visite [http://localhost:3000](http://localhost:3000). Adicione mais modelos com:
```bash
docker compose -f docker-compose.ollama.yml exec ollama ollama pull llama3.1:8b
```

### Opção 3: Dev Containers

1. Abra o VS Code com a [extensão Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
2. Abra o projeto e clique em "Reopen in Container" quando solicitado
3. Execute `bun run dev:full` no terminal ou use o alias `sim-start`
   - Isso inicia tanto a aplicação principal quanto o servidor de socket em tempo real

### Opção 4: Configuração Manual

**Requisitos:**
- Runtime [Bun](https://bun.sh/)
- PostgreSQL 12+ com [extensão pgvector](https://github.com/pgvector/pgvector) (necessário para embeddings de IA)

**Nota:** O Mangaba Flow usa embeddings vetoriais para recursos de IA como bases de conhecimento e busca semântica, que requer a extensão `pgvector` do PostgreSQL.

1. Clone e instale as dependências:

```bash
git clone https://github.com/simstudioai/sim.git
cd sim
bun install
```

2. Configure o PostgreSQL com pgvector:

Você precisa do PostgreSQL com a extensão `vector` para suporte a embeddings. Escolha uma opção:

**Opção A: Usando Docker (Recomendado)**
```bash
# Inicie o PostgreSQL com extensão pgvector
docker run --name simstudio-db \
  -e POSTGRES_PASSWORD=sua_senha \
  -e POSTGRES_DB=simstudio \
  -p 5432:5432 -d \
  pgvector/pgvector:pg17
```

**Opção B: Instalação Manual**
- Instale PostgreSQL 12+ e a extensão pgvector
- Veja o [guia de instalação do pgvector](https://github.com/pgvector/pgvector#installation)

3. Configure o ambiente:

```bash
cd apps/sim
cp .env.example .env  # Configure com as variáveis necessárias (DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL)
```

Atualize seu arquivo `.env` com a URL do banco de dados:
```bash
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/simstudio"
```

4. Configure o banco de dados:

```bash
bunx drizzle-kit migrate 
```

5. Inicie os servidores de desenvolvimento:

**Abordagem recomendada - execute ambos os servidores juntos (da raiz do projeto):**

```bash
bun run dev:full
```

Isso inicia tanto a aplicação Next.js principal quanto o servidor de socket em tempo real necessário para funcionalidade completa.

**Alternativa - execute os servidores separadamente:**

Aplicação Next.js (da raiz do projeto):
```bash
bun run dev
```

Servidor de socket em tempo real (do diretório `apps/sim` em um terminal separado):
```bash
cd apps/sim
bun run dev:sockets
```

## Stack Tecnológica

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Runtime**: [Bun](https://bun.sh/)
- **Banco de Dados**: PostgreSQL com [Drizzle ORM](https://orm.drizzle.team)
- **Autenticação**: [Better Auth](https://better-auth.com)
- **UI**: [Shadcn](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com)
- **Gerenciamento de Estado**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Editor de Fluxo**: [ReactFlow](https://reactflow.dev/)
- **Documentação**: [Fumadocs](https://fumadocs.vercel.app/)
- **Monorepo**: [Turborepo](https://turborepo.org/)
- **Tempo Real**: [Socket.io](https://socket.io/)
- **Jobs em Background**: [Trigger.dev](https://trigger.dev/)

## Contribuindo

Damos as boas-vindas a contribuições! Por favor, veja nosso [Guia de Contribuição](.github/CONTRIBUTING.md) para detalhes.

## Licença

Este projeto está licenciado sob a Licença Apache 2.0 - veja o arquivo [LICENSE](LICENSE) para detalhes.

<p align="center">Feito com ❤️ pela Equipe Mangaba Flow</p>