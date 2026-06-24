# Pipedrive Proxy

Proxy leve para resolver CORS ao usar a API do Pipedrive em widgets no navegador.

## Deploy no Railway (gratuito)

### 1. Suba o código no GitHub

```bash
git init
git add .
git commit -m "primeiro commit"
```

Crie um repositório no GitHub (https://github.com/new) e siga as instruções para conectar.

### 2. Deploy no Railway

1. Acesse https://railway.app e faça login com sua conta GitHub
2. Clique em **New Project → Deploy from GitHub repo**
3. Selecione o repositório `pipedrive-proxy`
4. Após o deploy, clique em **Variables** e adicione:
   - `PIPEDRIVE_API_KEY` = sua chave de API do Pipedrive
5. Clique em **Settings → Networking → Generate Domain** para obter a URL pública

### 3. Sua URL ficará assim:
```
https://pipedrive-proxy-xxxx.railway.app
```

## Como usar

Todas as chamadas à API do Pipedrive passam pelo `/api/` prefix:

| Pipedrive original | Via proxy |
|---|---|
| `/v1/deals` | `https://seu-proxy.railway.app/api/deals` |
| `/v1/persons` | `https://seu-proxy.railway.app/api/persons` |
| `/v1/users/me` | `https://seu-proxy.railway.app/api/users/me` |

Parâmetros de query funcionam normalmente (ex: `?status=open&limit=50`).
A chave de API é adicionada automaticamente pelo servidor — não precisa expor no frontend.

## Segurança

- A `PIPEDRIVE_API_KEY` fica apenas como variável de ambiente no Railway
- Nunca é exposta no frontend ou no código
- O proxy aceita requisições de qualquer origem (CORS aberto) — ideal para uso pessoal
