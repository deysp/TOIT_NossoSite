# TOIT · Ecossistema Digital

Monorepo que abriga o frontend (React + TypeScript + Tailwind) e o backend (Node.js + Express) do ecossistema digital da TOIT. O objetivo é entregar uma experiência "cyber-arcade" com conversão direta via WhatsApp e captação de briefings auditáveis.

## Arquitetura

- **Frontend**: Vite + React + Tailwind, mobile-first, configurado para consumir o backend via `VITE_API_BASE_URL`.
- **Backend**: Express com validação via Zod, PostgreSQL nativo (`pg`), rate limiting e CORS restrito.
- **Banco**: Migrações SQL em `apps/backend/migrations`, isolamento multi-tenant através da coluna `office_id`.
- **Deploy alvo**: Railway com `PORT=8080` fornecido pela plataforma e `DATABASE_URL` gerenciado automaticamente.

## Variáveis de ambiente

Configurar diretamente nas variáveis de ambiente do serviço Railway correspondente.

### Backend (`apps/backend`)

| Variável              | Descrição                                                                 |
| --------------------- | ------------------------------------------------------------------------- |
| `PORT`                | Porta exposta pelo Railway. Obrigatória.                                  |
| `DATABASE_URL`        | String de conexão PostgreSQL fornecida pelo Railway.                      |
| `ALLOWED_ORIGIN`      | Origem única autorizada a consumir o backend (ex: `https://toit.com.br`). |
| `DEFAULT_OFFICE_ID`   | Identificador da unidade/tenant que receberá os leads.                    |
| `NODE_ENV` (opcional) | Define o ambiente (`production` recomendado).                             |

> Antes de iniciar o backend é necessário garantir que `DEFAULT_OFFICE_ID` exista na tabela `offices`.

### Frontend (`apps/frontend`)

| Variável              | Descrição                                                    |
| --------------------- | ------------------------------------------------------------ |
| `VITE_API_BASE_URL`   | URL pública do backend (ex: `https://api.toit.com.br`).      |

## Migrações SQL

1. Abra o `DATABASE_URL` no TablePlus ou ferramenta equivalente.
2. Execute o conteúdo de `apps/backend/migrations/20251230_create_contact_requests.sql`.
3. Insira o tenant padrão:

   ```sql
   INSERT INTO offices (id, name)
   VALUES ('toit-primary', 'TOIT - Unidade Principal')
   ON CONFLICT (id) DO NOTHING;
   ```

   Ajuste o valor de `id` para casar com `DEFAULT_OFFICE_ID`.

## Execução

```bash
npm install
npm run build
```

- Frontend: `npm run dev --workspace @toit/frontend`
- Backend: definir as variáveis de ambiente e executar `npm run dev --workspace @toit/backend`

## Endpoints

| Método | Caminho        | Descrição                                 |
| ------ | -------------- | ----------------------------------------- |
| POST   | `/api/contact` | Registra o briefing e aciona trilha auditável |
| GET    | `/health`      | Healthcheck simples                        |

### Contrato `POST /api/contact`

```json
{
  "fullName": "Nome completo",
  "email": "email corporativo",
  "phone": "+55 47 99999-0000",
  "company": "Empresa",
  "projectDescription": "Briefing detalhado",
  "preferredContactChannel": "whatsapp",
  "whatsappNumber": "+55 47 99999-0000"
}
```

Resposta (201):

```json
{
  "status": "success",
  "data": {
    "contactRequestId": "uuid",
    "createdAt": "2025-12-30T21:15:10.123Z"
  }
}
```

## Observabilidade e segurança

- Rate limiting configurado (janela de 15 minutos, 8 requisições por IP) para o endpoint público.
- Logs estruturados com Pino e auditoria persistida em `contact_request_audit_log`.
- CORS restrito à origem autorizada.
- `office_id` aplicado em todas as operações de banco para garantir isolamento multi-tenant.
