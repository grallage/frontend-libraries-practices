import type { NextPage } from "next";
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
    url: "./formik",
    name: "formik",
  },
];

const Home: NextPage = () => {
  const Li = (props: LiProps) => {
    return (
      <>
        <NextLink href={props.url} passHref>
          <a>{props.name}</a>
        </NextLink>
      </>
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
      <Ul list={data} />
    </>
  );
};

export default Home;
