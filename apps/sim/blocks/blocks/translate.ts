import { TranslateIcon } from '@/components/icons'
import type { BlockConfig } from '@/blocks/types'
import type { ProviderId } from '@/providers/types'
import { getBaseModelProviders } from '@/providers/utils'

const getTranslationPrompt = (
  targetLanguage: string
) => `Você é um tradutor altamente qualificado. Sua tarefa é traduzir o texto fornecido para ${targetLanguage || 'Português'} enquanto:
1. Preserva o significado e nuances originais
2. Mantém níveis apropriados de formalidade
3. Adapta expressões idiomáticas e referências culturais adequadamente
4. Preserva formatação e caracteres especiais
5. Lida com termos técnicos com precisão

Retorne apenas o texto traduzido sem explicações ou notas. A tradução deve ser natural e fluente em ${targetLanguage || 'Português'}.`

export const TranslateBlock: BlockConfig = {
  type: 'translate',
  name: 'Traduzir',
  description: 'Traduzir texto para qualquer idioma',
  longDescription:
    'Converta texto entre idiomas preservando significado, nuances e formatação. Utilize modelos de linguagem avançados para produzir traduções naturais e fluentes com adaptações culturais apropriadas.',
  docsLink: 'https://docs.sim.ai/tools/translate',
  category: 'tools',
  bgColor: '#FF4B4B',
  icon: TranslateIcon,
  subBlocks: [
    {
      id: 'context',
      title: 'Texto para Traduzir',
      type: 'long-input',
      layout: 'full',
      placeholder: 'Digite o texto que você deseja traduzir',
      required: true,
    },
    {
      id: 'targetLanguage',
      title: 'Traduzir Para',
      type: 'short-input',
      layout: 'full',
      placeholder: 'Digite o idioma (ex: Espanhol, Francês, etc.)',
      required: true,
    },
    {
      id: 'model',
      title: 'Modelo',
      type: 'dropdown',
      layout: 'half',
      options: Object.keys(getBaseModelProviders()).map((key) => ({ label: key, id: key })),
      required: true,
    },
    {
      id: 'apiKey',
      title: 'Chave da API',
      type: 'short-input',
      layout: 'full',
      placeholder: 'Digite sua chave da API',
      password: true,
      connectionDroppable: false,
      required: true,
    },
    {
      id: 'systemPrompt',
      title: 'Prompt do Sistema',
      type: 'code',
      layout: 'full',
      hidden: true,
      value: (params: Record<string, any>) => {
        return getTranslationPrompt(params.targetLanguage || 'English')
      },
    },
  ],
  tools: {
    access: ['openai_chat', 'anthropic_chat', 'google_chat'],
    config: {
      tool: (params: Record<string, any>) => {
        const model = params.model || 'gpt-4o'

        if (!model) {
          throw new Error('Nenhum modelo selecionado')
        }

        const tool = getBaseModelProviders()[model as ProviderId]

        if (!tool) {
          throw new Error(`Invalid model selected: ${model}`)
        }

        return tool
      },
    },
  },
  inputs: {
    context: { type: 'string', description: 'Texto para traduzir' },
    targetLanguage: { type: 'string', description: 'Idioma de destino' },
    apiKey: { type: 'string', description: 'Chave da API do provedor' },
    systemPrompt: { type: 'string', description: 'Instruções de tradução' },
  },
  outputs: {
    content: { type: 'string', description: 'Texto traduzido' },
    model: { type: 'string', description: 'Modelo utilizado' },
    tokens: { type: 'json', description: 'Uso de tokens' },
  },
}
