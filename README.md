# 💙 Site Vaquinha Plaquet.AI

Site completo para campanha de doações do projeto Plaquet.AI - Mostra Ciência Jovem Recife 2025

---

## 📋 Arquivos Incluídos

```
plaquetaiWeb/
├── index.html          # Página principal (SUBSTITUIR O ATUAL)
├── styles.css          # Estilos completos (SUBSTITUIR O ATUAL)
├── script.js           # JavaScript funcional (SUBSTITUIR O ATUAL)
└── README.md          # Este arquivo
```

---

## 🚀 Como Usar

### 1. **Substituir Arquivos**

Substitua os arquivos atuais do seu site pelos novos:
- `index.html` → versão completa com foco em doações
- `styles.css` → estilos corrigidos sem película cinza
- `script.js` → funcionalidades interativas

### 2. **Atualizar Valor Arrecadado DIARIAMENTE**

Abra o arquivo `script.js` e encontre a linha 205:

```javascript
const currentAmount = 0; // ← MUDAR ESTE NÚMERO DIARIAMENTE
```

**Exemplo:**
```javascript
const currentAmount = 1500; // Se já arrecadou R$ 1.500
```

### 3. **Adicionar QR Code do PIX**

No arquivo `index.html`, encontre a seção "QR Code" (linha ~250):

```html
<div class="qr-code-container mt-3">
    <div class="qr-placeholder">
        <!-- SUBSTITUIR ESTE BLOCO POR: -->
        <img src="images/qrcode-pix.png" alt="QR Code PIX" class="qr-code">
    </div>
</div>
```

**Passos:**
1. Gere o QR Code do PIX no seu banco
2. Salve como `qrcode-pix.png`
3. Coloque na pasta `images/`
4. Substitua o código acima

### 4. **Adicionar Fotos da Equipe**

Encontre a seção "Sobre o Projeto" (linha ~350):

```html
<div class="visual-placeholder">
    <!-- SUBSTITUIR POR: -->
    <img src="images/equipe-plaquet.jpg" 
         alt="Equipe Plaquet.AI" 
         class="img-fluid rounded shadow-lg">
</div>
```

---

## 🎨 Personalizações Opcionais

### Mudar Cores Principais

Abra `styles.css` e edite as variáveis no início:

```css
:root {
    --primary-color: #6a0dad;    /* Roxo principal */
    --secondary-color: #8a2be2;  /* Roxo secundário */
    --accent-color: #9370db;     /* Roxo claro */
}
```

### Adicionar Links de Redes Sociais

No rodapé do `index.html` (linha ~650):

```html
<div class="social-links">
    <a href="https://instagram.com/seuperfil" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
    </a>
    <!-- Adicione mais redes -->
</div>
```

---

## 📊 Como Funciona o Medidor de Meta

### Atualização Manual (Atual)

1. Abra `script.js`
2. Encontre: `const currentAmount = 0;`
3. Mude para o valor atual: `const currentAmount = 2500;`
4. Salve e faça upload

### Atualização Automática (Futuro)

Para conectar com backend:

```javascript
// No script.js, substituir a função initDonationMeter:
async function initDonationMeter() {
    try {
        const response = await fetch('/api/doacoes/total');
        const data = await response.json();
        updateDonationMeter(data.total);
    } catch (error) {
        console.error('Erro ao carregar doações:', error);
    }
}
```

---

## ✅ Checklist de Configuração

```
[ ] Substituir index.html
[ ] Substituir styles.css
[ ] Substituir script.js
[ ] Adicionar QR Code do PIX (images/qrcode-pix.png)
[ ] Adicionar foto da equipe (images/equipe-plaquet.jpg)
[ ] Atualizar valor inicial em script.js
[ ] Testar chave PIX (copiar funcionando?)
[ ] Testar botões WhatsApp
[ ] Testar tema claro/escuro
[ ] Testar responsividade mobile
[ ] Atualizar links de redes sociais no footer
```

---

## 📱 Teste no Mobile

1. Abra o site no celular
2. Teste todos os botões:
   - ✅ Copiar PIX
   - ✅ WhatsApp
   - ✅ Menu mobile
   - ✅ FAQ (abrir/fechar)
   - ✅ Compartilhamento

---

## 🔧 Solução de Problemas

### **Problema: Textos não aparecem**

**Solução:** Certifique-se de que `styles.css` foi substituído completamente. Os textos devem ter `color: var(--text-color) !important;`

### **Problema: Película cinza sobre o site**

**Solução:** No `styles.css`, verifique:
```css
.donation-hero::before {
    display: none !important; /* Deve estar assim */
}
```

### **Problema: Botão copiar PIX não funciona**

**Solução:** Verifique se `script.js` está carregado:
```html
<script src="script.js"></script> <!-- Antes de fechar </body> -->
```

### **Problema: Medidor não atualiza**

**Solução:** Abra o Console do navegador (F12) e veja se há erros. Verifique se `currentAmount` tem um número válido.

---

## 🎯 Dicas de Divulgação

### Atualizações Sugeridas

**Diariamente:**
- Atualizar valor arrecadado
- Postar nos stories agradecendo doadores
- Compartilhar marcos (ex: "50% da meta!")

**Semanalmente:**
- Publicar relatório de progresso
- Mostrar bastidores da preparação
- Agradecer nominalmente (com autorização)

### Conteúdo para Redes Sociais

**Stories:**
```
"💙 JÁ ARRECADAMOS R$ XXX!
Faltam apenas R$ XXX para chegarmos em Recife!

Doe: [link do site]"
```

**Posts:**
- Fotos da equipe trabalhando
- Prints de doações recebidas (sem valores)
- Agradecimentos criativos
- Countdown até o evento

---

## 📞 Suporte

**Problemas técnicos?**
- Verifique o Console do navegador (F12 > Console)
- Teste em modo anônimo (desabilita extensões)
- Limpe cache do navegador

**Dúvidas sobre funcionalidades?**
- Releia este README
- Verifique os comentários no código
- Teste uma funcionalidade de cada vez

---

## 🎉 Recursos Especiais

### Modo Admin Secreto

Para ativar o painel de admin (atualização rápida):

1. No site, digite o código Konami:
   ```
   ↑ ↑ ↓ ↓ ← → ← → B A
   ```
2. Aparecerá um painel no canto inferior esquerdo
3. Digite o valor e clique "Atualizar"
4. **NOTA:** Isso salva no localStorage, não é permanente

### Animações Especiais

- **Meta atingida:** Confete automático (console log)
- **Botões:** Efeito pulse nos CTAs principais
- **Scroll:** Elementos aparecem suavemente
- **Hover:** Cards elevam ao passar mouse

---

## 📈 Métricas Recomendadas

### Acompanhar

- Total de doações (R$)
- Número de doadores
- Valor médio por doação
- Taxa de conversão (visitas → doações)
- Compartilhamentos nas redes

### Ferramentas

- Google Analytics (adicionar código)
- Facebook Pixel (opcional)
- Bitly para links (medir cliques)

---

## 🚀 Melhorias Futuras

### Backend Integration

```javascript
// Sugestão de API endpoints:
POST /api/doacoes          // Registrar doação
GET  /api/doacoes/total    // Pegar total arrecadado
GET  /api/doacoes/lista    // Listar doadores (anônimo)
```

### Features Extras

- [ ] Integração com Gateway de Pagamento
- [ ] Certificado digital de doação (PDF)
- [ ] Mural de doadores (opcional)
- [ ] Live da prestação de contas
- [ ] Blog com atualizações da viagem

---

## 📜 Licença

Este código é open-source e pode ser usado/modificado livremente para projetos educacionais e científicos.

**Créditos:** Desenvolvido para o projeto Plaquet.AI - CEMEP Paulínia, SP

---

## 💙 Mensagem Final

Obrigado por usar este template! Esperamos que ajude a vaquinha a atingir a meta e levar a ciência brasileira longe! 🚀

**Boa sorte com a campanha!**

#PlaquetAI #CiênciaJovem #EducaçãoPública #VaquinhaCientífica

---

**Última atualização:** Novembro 2025  
**Versão:** 1.0.0  
**Status:** Pronto para produção ✅
