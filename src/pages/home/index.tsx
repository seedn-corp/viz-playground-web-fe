import { Flex, Grid } from '@basiln/utils';
import { Header } from '@/components/common/Header';
import { homeCss } from '@/pages/home/styles';

export const Home = () => {
  return (
    <Flex>
      <Header />

      <Grid
        columns={['1fr', '1fr']}
        rows={['1fr', '1fr']}
        gap={10}
        css={homeCss.container}
      >
        <Grid.Item gridRow="1" gridColumn="1">
          <div>chart 1</div>
        </Grid.Item>

        <Grid.Item gridRow="1" gridColumn="2">
          <div>chart 2</div>
        </Grid.Item>

        <Grid.Item gridRow="2" gridColumn="1">
          <div>chart 3</div>
        </Grid.Item>

        <Grid.Item gridRow="2" gridColumn="2">
          <div>chart 4</div>
        </Grid.Item>
      </Grid>
    </Flex>
  );
};
