    /*<ScrollView style={styles.blogCardsContainer}>
          <Text style={styles.blogCardsTitle}>Latest Blogs</Text>
          <FlatList
            data={blogCards}
            numColumns={2} // Set number of columns to 2
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.blogCard} onPress={() => router.push(item.link as any)}>
                <Text style={styles.blogCardImage}>{item.image}</Text>
                <Text style={styles.blogCardTitle}>{item.title}</Text>
                <Text style={styles.blogCardDescription}>{item.description}</Text>
                <TouchableOpacity style={styles.readMoreButton} onPress={() => router.push(item.link as any)}>
                  <Text style={styles.readMoreText}>Read More</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </ScrollView>*/