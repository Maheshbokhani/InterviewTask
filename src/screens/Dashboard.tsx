import React, {useEffect, useMemo, useState} from 'react';
import {Text, Dimensions, StyleSheet, View} from 'react-native';

import {BarChart} from 'react-native-gifted-charts';

// Components
import Layout from 'components/Layouts/MainLayout';
import {colors} from 'utils/colors';
import dbServices from 'services/database';
import {countItemsByMonth, getItemsByMonth} from 'utils/index';
import Header from 'components/Layouts/Header';
import UserListItem from 'components/UserListItem';

const Dashboard = () => {
  const [userList, setUserList] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('Jan');

  useEffect(() => {
    (async () => {
      dbServices.fetchDB(setUserList);
    })();
  }, []);

  const userLists = useMemo(() => {
    dbServices.fetchDB(setUserList);
    return getItemsByMonth(userList, selectedMonth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  const monthCounts: any = useMemo(
    () => countItemsByMonth(userList),
    [userList],
  );

  const barData = [
    {value: 1, label: 'Jan'},
    {value: 1, label: 'Feb'},
    {value: 2, label: 'Mar'},
    {value: 2, label: 'Apr'},
    {value: 5, label: 'May'},
    {value: 2, label: 'Jun'},
    {value: monthCounts?.Jul || 1, label: 'Jul'},
    {value: monthCounts?.Aug || 0, label: 'Aug'},
    {value: monthCounts?.Sep || 0, label: 'Sep'},
  ];

  return (
    <Layout headerContent={<Header title={'Dashboard'} />}>
      <View style={styles.mainContainer}>
        <BarChart
          barWidth={Dimensions.get('screen').width * 0.03}
          noOfSections={3}
          barBorderRadius={4}
          frontColor={colors.blue}
          yAxisTextStyle={{color: colors.text}}
          xAxisLabelTextStyle={{color: colors.text}}
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
          onPress={({label}) => setSelectedMonth(label)}
        />
        <Text style={styles.selectedMonthTxt}>{selectedMonth}</Text>
        <UserListItem userList={userLists} hideDelete />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingTop: '5%',
  },
  selectedMonthTxt: {
    fontWeight: 'bold',
    fontSize: 26,
    color: colors.text,
    alignSelf: 'flex-start',
    marginTop: '5%',
  },
});
export default Dashboard;
