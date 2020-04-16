import React, { useState, useEffect, Fragment } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import axios from 'axios'

const App = () => {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(response.data)
      setTimeout(() => setLoading(false), 3000)
    })()
  }, [])

  return (
    <Fragment>
      {
        loading && (
          <View style={styles.containerLoading}>
            <ActivityIndicator color='#850ffc' size={50} />
          </View>
        )
      }
      {
        !loading && (
          <FlatList
            style={styles.list}
            data={posts}
            renderItem={({ item }) => (
              <View style={styles.post}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
              </View>
            )}
            keyExtractor={post => post.id}
          />
        )
      }
    </Fragment >
  )
}

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eee'
  },
  post: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#850ffc',
    backgroundColor: '#d2adff',
    padding: 20,
    marginTop: 10
  },
  title: {
    fontSize: 18,
    paddingBottom: 8,
    paddingTop: 5,
    color: '#333'
  },
  body: {
    color: '#333'
  }
})

export default App