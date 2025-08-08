import Joi from "joi";

const schema = Joi.object({
  projectName: Joi.string().min(6).max(50).required().messages({
    'string.base': 'O nome do projecto deve ser um texto.',
    'string.empty': 'O nome do projecto é obrigatório.',
    'string.min': 'O nome do projecto deve ter no mínimo {#limit} caracteres.',
    'string.max': 'O nome do projecto deve ter no máximo {#limit} caracteres.',
    'any.required': 'O campo nome do projecto é obrigatório.'
  }),

  projectMoney: Joi.number().min(0).required().messages({
    'number.base': 'O orçamento deve ser um número.',
    'number.min': 'O orçamento deve ser no mínimo {#limit}.',
    'any.required': 'O campo orçamento é obrigatório.'
  }),

  projectCategory: Joi.string()
    .valid(...["Planejamento", "Desenvolvimento", "Design", "Pesquisa", "Testes", "Manutenção"])
    .required()
    .messages({
      'any.only': 'Selecione uma categoria válida.',
      'string.empty': 'A categoria do projecto é obrigatória.',
      'any.required': 'O campo categoria do projecto é obrigatório.'
    })
});

export default schema
