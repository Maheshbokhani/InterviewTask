import React from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import IconButton from 'components/Button/IconButton';

// Utils
import {colors} from 'utils/colors';

// Services
import dbServices from 'services/database';

interface Props {
  userList: userProps[] | [];
  hideDelete?: boolean;
}

interface userProps {
  email: string;
  name: string;
  id: string;
  updated_date: string;
}

const UserListItem = ({userList, hideDelete}: Props) => {
  const deleteUser = id => {
    dbServices.deleteDB(id);
    dbServices.fetchDB();
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={item.id}
        style={[styles.itemContainer, index % 2 === 0 && styles.transparent]}>
        <View>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemEmail}>{item.email}</Text>
        </View>
        {!hideDelete && (
          <IconButton
            style={styles.iconBtn}
            icon={<AntDesign name="delete" size={16} color={colors.text} />}
            onPress={function (): void {
              Alert.alert(item.name, 'Are you sure?', [
                {text: 'Cancel', style: 'cancel', onPress: () => {}},
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => deleteUser(item.id),
                },
              ]);
            }}
          />
        )}
      </View>
    );
  };

  return (
    <FlatList
      key={'user_list'}
      data={userList}
      renderItem={renderItem}
      style={styles.container}
      ListEmptyComponent={
        <View style={styles.emptyItemContainer}>
          <Text style={styles.noItemText}>No users found</Text>
        </View>
      }
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    marginTop: '5%',
  },
  itemContainer: {
    backgroundColor: colors.forground + 90,
    width: '100%',
    padding: '5%',
    paddingVertical: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {fontSize: 16, fontWeight: 'bold', color: colors.text},
  itemEmail: {fontSize: 14, color: colors.text},
  emptyItemContainer: {flex: 1, alignItems: 'center', marginTop: '15%'},
  noItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.forground,
  },
  transparent: {
    backgroundColor: colors.forground + 20,
  },
  iconBtn: {backgroundColor: 'transparent', width: 30, height: 30},
});

export default UserListItem;
