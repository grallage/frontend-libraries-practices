import Head from "next/head";
import NextLink from "next/link";

interface LiProps {
  url: string;
  name: string;
}

interface UlProps {
  list: LiProps[];
}

const data: LiProps[] = [
  {
    url: "./formik/demo1",
    name: "basic",
  },
  {
    url: "./formik/demo2",
    name: "basic2",
  },
  {
    url: "./formik/demo3",
    name: "basic with validate",
  },
  {
    url: "./formik/demo4",
    name: "yup basic",
  },
  {
    url: "./formik/demo5",
    name: "yup simpler",
  },
  {
    url: "./formik/demo6",
    name: "custom formik widget",
  },
  {
    url: "./formik/demo8",
    name: "custom input field widget",
  },
  {
    url: "./formik/demo7",
    name: "final version",
  },
];
const Page = () => {
  const Li = (props: LiProps) => {
    return (
      <li>
        <NextLink href={props.url} passHref>
          <a>{props.name}</a>
        </NextLink>
      </li>
    );
  };
  const Ul = (props: UlProps) => {
    return (
      <ul>
        {props.list.map((item, index) => {
          return <Li key={index} url={item.url} name={item.name} />;
        })}
      </ul>
    );
  };

  return (
    <>
      <Head>
        <title>Formik Demo List</title>
      </Head>
      <a
        href={`https://formik.org/docs/tutorial`}
        target="_blank"
        rel="noreferrer"
      >
        Formik Docs
      </a>
      <Ul list={data} />
    </>
  );
};

export default Page;
