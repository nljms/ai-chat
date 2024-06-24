import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';

const options: MarkdownToJSX.Options = {
  overrides: {
    h1: {
      component: 'h1',
      props: {
        className: 'text-4xl font-bold text-gray-300 my-4',
      },
    },
    h2: {
      component: 'h2',
      props: {
        className: 'text-3xl font-bold text-gray-200 my-3',
      },
    },
    h3: {
      component: 'h3',
      props: {
        className: 'text-2xl font-bold text-gray-100',
      },
    },
    h4: {
      component: 'h4',
      props: {
        className: 'text-xl font-bold text-gray-600',
      },
    },
    h5: {
      component: 'h5',
      props: {
        className: 'text-lg font-bold text-gray-500 my-1',
      },
    },
    h6: {
      component: 'h6',
      props: {
        className: 'text-base font-bold text-gray-400 my-1',
      },
    },
    p: {
      component: 'p',
      props: {
        className: 'text-base text-gray-100',
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
        className: 'my-1',
      },
    },
    blockquote: {
      component: 'blockquote',
      props: {
        className: 'border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600',
      },
    },
    code: {
      component: 'code',
      props: {
        className: 'bg-gray-100 text-red-600 px-1 rounded',
      },
    },
    pre: {
      component: 'pre',
      props: {
        className: 'bg-gray-100 p-2 rounded overflow-auto',
      },
    },
    img: {
      component: 'img',
      props: {
        className: 'max-w-full',
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
