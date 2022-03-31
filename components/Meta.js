import Head from 'next/head';

const Meta = ({title, keywords, description}) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />      
      <title>{title}</title>
    </Head>
  );
}

export default Meta;
