# Scheduler — Planejador de Cronogramas · CC UFPI 2026.2

App React + Vite para montar cronogramas de disciplinas da graduação em Ciência da
Computação da UFPI (oferta oficial 2026.2). Lista as matérias, monta a grade semanal,
detecta conflitos de horário e guarda tudo no navegador. Visual Blueprint (Palantir)
com tema claro/escuro. Arquitetura Package by Feature.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · Zustand (persist) · lucide-react ·
Biome · bun.

Tema keyed por `data-theme` (`light` / `dark`), tokens Blueprint em CSS variables e
utilitários gerados via `@theme`. Persistência 100% no `localStorage` (chave
`planner-2026-2`), sem backend.

## Como rodar

```bash
# 1. Dependências
bun install

# 2. Dev
bun dev              # http://localhost:5173

# 3. Build de produção
bun run build        # gera dist/
bun run preview      # serve o dist localmente
```

Não há variáveis de ambiente: todos os dados vivem no navegador do usuário.

## Funcionalidades

- **Lista de matérias** com busca por nome ou código, separada em Obrigatórias
  pendentes, Optativas disponíveis, Ocultas e Já pagas.
- **Múltiplos cronogramas** (abas): criar, renomear (duplo clique) e excluir.
- **Grade semanal** Segunda a Sexta, 06:00 às 18:00, com blocos de aula que ocupam
  várias horas e botão de remover ao passar o mouse.
- **Detecção de conflito**: impede adicionar uma matéria que sobrepõe horário de outra
  já presente no cronograma ativo, com aviso via toast.
- **Escolha de turma** para disciplinas com mais de uma turma (diálogo dedicado).
- **Ocultar / marcar como paga** matérias direto da lista.
- **Tema claro/escuro** com detecção da preferência do sistema no primeiro acesso.
- **Persistência automática** de cronogramas, estado das matérias e tema no
  `localStorage`.

## Estrutura (Package by Feature)

```
src/
├── main.tsx                  # entrypoint
├── app.tsx                   # shell: header + aside + main + toaster
├── styles/globals.css        # Tailwind v4, tokens Blueprint, dark variant
├── shared/                   # código reutilizado por 2+ features
│   ├── components/
│   │   ├── ui/               # button, input, tag, chip, color-dot, dialog, toast, stat, section-title
│   │   ├── theme/            # theme-provider, theme-toggle
│   │   └── header/           # app-header
│   ├── hooks/                # use-toast
│   ├── stores/               # planner-store (Zustand + persist)
│   ├── lib/                  # horario (parse/format)
│   ├── utils/                # cn
│   └── types/                # planner.types
└── features/
    ├── subjects/             # dados das matérias, lista, busca, painel
    │   ├── components/ data/ utils/ index.ts
    └── schedules/            # abas, grade, blocos, diálogo de turma, conflito
        ├── components/ constants/ utils/ index.ts
```

Cada feature expõe sua API pública por um `index.ts`. `shared/` só recebe o que é usado
por mais de uma feature. Nomes de arquivo em kebab-case; componentes em PascalCase.

## Formato de horário

Os horários seguem a notação da UFPI, ex.: `35M56` significa dias 3 e 5 (Terça e
Quinta), turno da Manhã, horas 5 e 6 (10:00 às 12:00). Turnos: `M` manhã, `T` tarde,
`N` noite. O parser fica em `src/shared/lib/horario.ts`.

## Deploy

Publicado na Vercel (framework preset Vite, build `vite build`, saída `dist/`). Por ser
uma SPA estática sem backend, qualquer host de estáticos serve.

## Scripts

| Script | Ação |
|--------|------|
| `bun dev` | Servidor de desenvolvimento (Vite) |
| `bun run build` | Type check + build de produção |
| `bun run preview` | Serve o `dist/` localmente |
| `bun run health` | `tsc --noEmit` |
| `bun run check` | Biome (lint + format check) |
| `bun run fix` | Biome com autofix |
| `bun run lint` | Biome lint |
