// src/types.d.ts
// Этот файл существует для объявления пользовательских типов, которых нет в стандартных пакетах.

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

// Специально для вашего импорта стилей MDXEditor
declare module '@mdxeditor/editor/style.css' {
  const content: string
  export default content
}