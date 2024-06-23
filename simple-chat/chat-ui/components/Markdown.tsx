import MarkdownJsx, { MarkdownToJSX } from 'markdown-to-jsx';

type MarkdownProps = {
  children: string;
};

const Markdown = (props: MarkdownProps) => {
  const overrides: MarkdownToJSX.Overrides = {
    h1: {
      component: 'h2',
      props: {
        className: 'text-2xl font-bold text-slate-400',
      },
    },
    h2: {
      component: 'h2',
      props: {
        className: 'text-xl font-bold text-slate-400',
      },
    },
    h3: {
      component: 'h3',
      props: {
        className: 'text-lg font-bold text-slate-400',
      },
    },
    p: {
      component: 'p',
      props: {
        className: 'text-slate-900',
      },
    },
    a: {
      component: 'a',
      props: {
        className: 'text-slate-400',
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
        className: 'text-slate-900',
      },
    },
    blockquote: {
      component: 'blockquote',
      props: {
        className: 'border-l-4 border-sky-400 pl-2',
      },
    },
    code: {
      component: 'code',
      props: {
        className: 'bg-sky-700 text-slate-100 text-sm p-1 rounded-md',
      },
    },
    pre: {
      component: 'pre',
      props: {
        className: 'bg-sky-800 text-slate-700 p-2 rounded-md',
      },
    },
    table: {
      component: 'table',
      props: {
        className: 'table-auto w-full border-collapse border border-slate-300',
      },
    },
    tr: {
      component: 'tr',
      props: {
        className: ' border border-slate-300',
      },
    },
    th: {
      component: 'th',
      props: {
        className: 'p-2',
      },
    },
    td: {
      component: 'td',
      props: {
        className: 'p-2 border border-slate-300',
      },
    },
  };

  return (
    <MarkdownJsx
      options={{
        overrides,
      }}
    >
      {props.children}
    </MarkdownJsx>
  );
};

export default Markdown;
