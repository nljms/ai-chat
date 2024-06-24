import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';

const options: MarkdownToJSX.Options = {
  overrides: {
    h1: {
      component: 'h1',
      props: {
        className: 'text-4xl font-bold text-slate-600 my-4',
      },
    },
    h2: {
      component: 'h2',
      props: {
        className: 'text-3xl font-bold text-slate-700 my-3',
      },
    },
    h3: {
      component: 'h3',
      props: {
        className: 'text-2xl font-bold text-slate-500',
      },
    },
    h4: {
      component: 'h4',
      props: {
        className: 'text-xl font-bold text-slate-600',
      },
    },
    h5: {
      component: 'h5',
      props: {
        className: 'text-lg font-bold text-slate-500 my-1',
      },
    },
    h6: {
      component: 'h6',
      props: {
        className: 'text-base font-bold text-slate-400 my-1',
      },
    },
    p: {
      component: 'p',
      props: {
        className: 'text-base text-slate-500',
      },
    },
    a: {
      component: 'a',
      props: {
        className: 'text-blue-500 underline',
      },
    },
    ul: {
      component: 'ul',
      props: {
        className: 'list-disc list-inside',
      },
    },
    ol: {
      component: 'ol',
      props: {
        className: 'list-decimal list-inside',
      },
    },
    li: {
      component: 'li',
      props: {
        className: 'my-1 text-slate-500',
      },
    },
    blockquote: {
      component: 'blockquote',
      props: {
        className: 'border-l-4 border-gray-300 pl-4 italic my-4 text-slate-600',
      },
    },
    code: {
      component: 'code',
      props: {
        className: 'bg-slate-950 text-slate-400 px-1 rounded',
      },
    },
    pre: {
      component: 'pre',
      props: {
        className: 'bg-slate-950 p-4 rounded overflow-auto',
      },
    },
    img: {
      component: 'img',
      props: {
        className: 'max-w-full',
      },
    },
    table: {
      component: 'table',
      props: {
        className: 'table-auto w-full',
      },
    },
    th: {
      component: 'th',
      props: {
        className: 'border border-gray-200 p-2 bg-slate-950 text-slate-300',
      },
    },
    td: {
      component: 'td',
      props: {
        className: 'border border-gray-200 p-2',
      },
    },
    tr: {
      component: 'tr',
      props: {
        className: 'bg-slate-800',
      },
    },
  },
};

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      <Markdown options={options}>{content}</Markdown>
    </div>
  );
};

export default MarkdownRenderer;
