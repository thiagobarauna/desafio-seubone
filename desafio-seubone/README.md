# Quatro5 Board

Ferramenta de gestao de atividades para um time pequeno, criada para o desafio tecnico da Quatro5.

## Como rodar

1. Clone o repositorio:

```bash
git clone https://github.com/thiagobarauna/desafio-seubone.git
```

2. Entre na pasta do projeto:

```bash
cd desafio-seubone
```

3. Entre na pasta da aplicacao:

```bash
cd desafio-seubone
```

4. Instale as dependencias:

```bash
npm install
```

5. Rode o projeto:

```bash
npm run dev
```

6. Abra o endereco exibido no terminal, normalmente `http://localhost:5173`.

## Caminho escolhido

Usei Kanban como base principal porque o problema do Ricardo e falta de visibilidade: ele nao sabe o que esta parado, o que esta em andamento e o que foi entregue. O quadro separa as atividades em A fazer, Em andamento, Em revisao e Concluido, com limite visual de WIP para evitar que o time assuma trabalho demais ao mesmo tempo.

Tambem usei uma adaptacao leve de OKR/SMART: cada atividade tem um objetivo conectado, prazo, responsavel, prioridade e estimativa. Isso ajuda o Ricardo a sair de conversas subjetivas e comparar trabalho com impacto, prazo e capacidade real.

## Indicadores

- Prazo estourado: mostra quantas atividades ativas ja passaram do prazo. O Ricardo usa esse numero para renegociar entrega, destravar responsaveis e priorizar o que precisa de acao imediata.
- Atividades vencendo em ate 2 dias: antecipa risco antes de virar atraso. O Ricardo decide se precisa redistribuir carga ou reduzir escopo.
- Em andamento versus limite WIP: compara o trabalho aberto com o limite saudavel da semana. Se passar do limite, a decisao e parar de puxar tarefas novas e concluir o que ja comecou.
- Entrega da sprint: mostra o percentual de atividades concluidas no ciclo. O Ricardo usa para avaliar ritmo e ajustar a capacidade prometida para a proxima semana.
- Bloqueios ativos: evidencia tarefas que nao avancam por dependencia externa ou decisao pendente. O Ricardo decide onde precisa intervir pessoalmente.
- Carga por pessoa: mostra quantas tarefas ativas cada membro possui. O Ricardo identifica desequilibrio entre pessoas sobrecarregadas e pessoas com folga.

## Funcionalidades

- Dados de exemplo com uma equipe ficticia de TI, clientes internos, objetivos, prazos e prioridades.
- Criacao de novas atividades pelo formulario.
- Filtros por responsavel e prioridade.
- Movimento das atividades entre colunas.
- Marcacao e liberacao de bloqueios.
- Indicadores calculados automaticamente a partir do quadro.
- Area visual de ponto dos funcionarios, com entrada, saida, jornada e status do colaborador.
- Interface inspirada em Trello, com identidade visual preta e amarela.

## Decisoes de escopo

Para caber no prazo, mantive os dados em memoria no front-end. Isso deixa a avaliacao simples: ao rodar o projeto, a ferramenta ja aparece preenchida e funcionando. Com mais tempo, eu adicionaria persistencia local ou backend, drag and drop entre colunas, autenticacao por perfil, historico de mudancas, comentarios por atividade e graficos de fluxo acumulado.

## IA

Usei IA como apoio para acelerar a implementacao e organizar a entrega, mas as decisoes do produto foram mantidas simples de explicar: Kanban para visibilidade, WIP para foco, prazos para risco e KPIs que geram decisao.
