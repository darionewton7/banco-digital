# Documentação de Testes - BancoDigitalApp

Este documento descreve a abordagem de testes utilizada para o projeto `BancoDigitalApp` e as limitações encontradas no ambiente de desenvolvimento atual.

## Testes Implementados

Foram implementados testes unitários usando **Jest** e **react-test-renderer** para verificar a renderização correta dos componentes UI reutilizáveis. Os seguintes arquivos de teste foram criados no diretório `__tests__`:

1.  **`Button.test.tsx`**: Testa o componente `CustomButton` em diferentes estados (padrão, desabilitado, carregando) e com diferentes variantes (primário, secundário, perigo). Foram gerados snapshots para garantir a consistência da renderização.
2.  **`Input.test.tsx`**: Testa o componente `CustomInput` com diferentes propriedades (com/sem label, com/sem erro, com valor predefinido). Foram gerados snapshots para garantir a consistência da renderização.
3.  **`Header.test.tsx`**: Testa o componente `CustomHeader`, verificando a renderização com e sem o botão de voltar, e considerando o estado da navegação (`canGoBack`). Foram gerados snapshots.

## Execução dos Testes

Os testes foram executados com o comando `npm test`. Os resultados foram os seguintes:

-   **Sucesso**: Os testes para `CustomButton` e `CustomInput` passaram, e 9 snapshots foram gerados com sucesso.
-   **Falhas**: Os testes para `CustomHeader` e `App` (teste padrão do React Native) falharam. As falhas parecem estar relacionadas à configuração do Jest com módulos ES (como `@react-navigation/native`), resultando em erros de sintaxe (`SyntaxError: Unexpected token 'export'`). A configuração do Jest pode precisar de ajustes adicionais (como `transformIgnorePatterns`) para lidar corretamente com essas dependências no ambiente de teste.

## Limitações do Ambiente

O ambiente de desenvolvimento atual (sandbox) possui as seguintes limitações que impedem testes mais abrangentes:

1.  **Ausência de Emuladores/Dispositivos**: Não é possível executar o aplicativo em um emulador Android/iOS ou em um dispositivo físico. Isso impede a realização de:
    *   **Testes Visuais**: Verificar a aparência real das telas e componentes.
    *   **Testes de Interação**: Testar a resposta a toques, gestos e navegação real.
    *   **Testes de Integração**: Verificar a comunicação entre diferentes partes do aplicativo (ex: navegação entre telas).
    *   **Testes End-to-End (E2E)**: Simular fluxos completos do usuário.
2.  **Configuração do Jest**: A configuração padrão do Jest pode não ser suficiente para lidar com todas as dependências do React Native, especialmente aquelas que usam sintaxe de módulos ES, como visto nas falhas relacionadas ao React Navigation.

## Recomendações para Testes Adicionais

Para garantir a qualidade e a robustez do aplicativo, recomenda-se fortemente que você realize os seguintes testes em seu ambiente de desenvolvimento local:

1.  **Execução Manual**: Execute o aplicativo em emuladores e/ou dispositivos físicos (`npx react-native run-android`, `npx react-native run-ios`) para verificar visualmente todas as telas, componentes e fluxos de navegação.
2.  **Testes de Interação**: Utilize bibliotecas como `@testing-library/react-native` para escrever testes que simulem interações do usuário (cliques em botões, digitação em inputs) e verifiquem o comportamento resultante.
3.  **Testes de Integração**: Teste a integração entre diferentes componentes e telas, especialmente os fluxos de navegação e passagem de dados.
4.  **Testes End-to-End (E2E)**: Considere ferramentas como Detox ou Appium para automatizar fluxos completos do usuário no aplicativo real.
5.  **Ajuste da Configuração do Jest**: Investigue e ajuste a configuração do Jest (`jest.config.js`) para resolver as falhas relacionadas aos módulos ES, possivelmente ajustando `transformIgnorePatterns`.

## Conclusão

Os testes unitários implementados fornecem uma camada básica de verificação para os componentes UI. No entanto, devido às limitações do ambiente, testes manuais e de integração mais aprofundados são essenciais e devem ser realizados por você para validar completamente o aplicativo `BancoDigitalApp`.

