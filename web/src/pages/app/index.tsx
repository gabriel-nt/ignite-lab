import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useMeQuery } from '../../graphql/generated/graphql';
import {
  getServerPageGetProducts,
  ssrGetProducts,
} from '../../graphql/generated/page';
import { withApollo } from '../../lib/withApollo';

function Home({ data }) {
  const { data: me } = useMeQuery();

  return (
    <div className="text-violet-400">
      <h1>Hello world</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ctx => {
    return getServerPageGetProducts({}, ctx);
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
