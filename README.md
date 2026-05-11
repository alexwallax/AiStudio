# Nexus CRM - Enterprise Dashboard

Este projeto está pronto para ser hospedado no **Vercel**.

## Integração com Vercel

Siga os passos abaixo para garantir que tudo funcione corretamente:

1. **GitHub**: Certifique-se de que o código está no seu repositório GitHub.
2. **Dashboard do Vercel**: Importe o projeto no Vercel.
3. **Variáveis de Ambiente**: No Vercel, adicione as seguintes variáveis (você pode encontrá-las no seu painel do Supabase):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Analytics e Speed Insights**: Já estão pré-configurados. Após o deploy, você verá as estatísticas no aba "Analytics" do seu projeto no Vercel.

## Funcionalidades

- Gerenciamento de contatos
- Sistema de autenticação (fácil integração com Supabase Auth)
- Layout responsivo e moderno (Tailwind CSS)
- Métricas de performance e uso (Vercel Analytics)

## Desenvolvimento Local

```bash
npm install
npm run dev
```
