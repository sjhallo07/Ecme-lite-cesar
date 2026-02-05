import Constants from 'expo-constants'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { getHealth, getWorkers } from '../../services/api'

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)
  const [workers, setWorkers] = useState([])

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getHealth()
        .then((res) => setStatus(res))
        .catch((e) => setStatus({ error: e.message })),
      getWorkers()
        .then((res) => setWorkers(res))
        .catch((e) => {
          console.error(e)
          setWorkers([])
        }),
    ]).finally(() => setLoading(false))
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RepairPro Mobile</Text>
      <Text>API_BASE_URL: {Constants.expoConfig?.extra?.API_BASE_URL}</Text>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 12 }} />
      ) : (
        <>
          <View style={styles.statusContainer}>
            <Text style={styles.statusTitle}>Backend status:</Text>
            <Text>{status ? JSON.stringify(status) : 'no status'}</Text>
          </View>
          <View style={styles.workersContainer}>
            <Text style={styles.subtitle}>Available Workers</Text>
            <FlatList
              data={workers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
              ListEmptyComponent={<Text>No workers found.</Text>}
            />
          </View>
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Open details" onPress={() => navigation.navigate('Details')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    paddingTop: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statusContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  statusTitle: {
    fontWeight: 'bold',
  },
  workersContainer: {
    flex: 1,
    width: '100%',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
  },
})
