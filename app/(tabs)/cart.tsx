import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const INITIAL_CART = [
  { id: '1', name: 'Bell Pepper Red', unit: '1kg, Price', price: 4.99, quantity: 1, image: require('../../assets/images/bell_pepper.png') },
  { id: '2', name: 'Egg Chicken Red', unit: '4pcs, Price', price: 1.99, quantity: 1, image: require('../../assets/images/egg_chicken_red.png') },
  { id: '3', name: 'Organic Bananas', unit: '12kg, Price', price: 3.00, quantity: 1, image: require('../../assets/images/bananas.png') },
  { id: '4', name: 'Ginger', unit: '250g, Price', price: 2.99, quantity: 1, image: require('../../assets/images/ginger.png') },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const router = useRouter();

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* phoneWrapper hiện tại đã có viền đen bao quanh */}
      <View style={styles.phoneWrapper}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>
        
        {/* Danh sách sản phẩm */}
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Ionicons name="close" size={22} color="#7C7C7C" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemUnit}>{item.unit}</Text>
                
                <View style={styles.itemFooter}>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityBtn} onPress={() => updateQuantity(item.id, -1)}>
                      <Ionicons name="remove" size={20} color="#B3B3B3" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.quantityBtn} onPress={() => updateQuantity(item.id, 1)}>
                      <Ionicons name="add" size={20} color="#53B175" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              </View>
            </View>
          )}
        />

        {/* CỤM BOTTOM CỐ ĐỊNH Ở ĐÁY KHUNG ĐIỆN THOẠI */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.8}>
            <View style={{ flex: 1 }} />
            <Text style={styles.checkoutText}>Go to Checkout</Text>
            <View style={styles.priceBadge}>
              <Text style={styles.badgeText}>${totalPrice.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.customTabBar}>
            <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/(tabs)')}>
              <Ionicons name="storefront-outline" size={24} color="#181725" />
              <Text style={styles.tabLabel}>Shop</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/(tabs)/explore')}>
              <Ionicons name="search-outline" size={24} color="#181725" />
              <Text style={styles.tabLabel}>Explore</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem}>
              <Ionicons name="cart" size={24} color="#53B175" />
              <Text style={[styles.tabLabel, { color: '#53B175' }]}>Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/(tabs)/favourite')}>
              <Ionicons name="heart-outline" size={24} color="#181725" />
              <Text style={styles.tabLabel}>Favourite</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/(tabs)/account')}>
              <Ionicons name="person-outline" size={24} color="#181725" />
              <Text style={styles.tabLabel}>Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#F5F5F5' // Nền xám nhạt bên ngoài để nổi bật khung điện thoại
  },
  phoneWrapper: { 
    flex: 1, 
    backgroundColor: 'white',
    width: width > 500 ? 414 : '100%',
    alignSelf: 'center',
    position: 'relative',
    
    // --- THÊM VIỀN ĐEN VÀ BO GÓC TẠI ĐÂY ---
    borderLeftWidth: width > 500 ? 8 : 0, 
    borderRightWidth: width > 500 ? 8 : 0,
    borderColor: '#181725', // Viền đen đậm
    borderRadius: width > 500 ? 30 : 0,
    overflow: 'hidden', // Đảm bảo nội dung không tràn khỏi góc bo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2',
  },
  headerTitle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center',
    color: '#181725'
  },
  listContent: { 
    paddingHorizontal: 20, 
    paddingTop: 10,
    paddingBottom: 170, // Đẩy danh sách lên để không bị khuất sau nút Checkout
  },
  separator: { 
    height: 1, 
    backgroundColor: '#F2F3F2', 
    marginVertical: 15 
  },
  cartItem: { flexDirection: 'row', alignItems: 'center' },
  itemImage: { width: 70, height: 70, resizeMode: 'contain' },
  itemInfo: { flex: 1, marginLeft: 20 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  itemUnit: { fontSize: 14, color: '#7C7C7C', marginTop: 2 },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityBtn: {
    width: 45, height: 45, borderRadius: 17,
    borderWidth: 1, borderColor: '#E2E2E2',
    justifyContent: 'center', alignItems: 'center'
  },
  quantityText: { fontSize: 16, marginHorizontal: 15, fontWeight: '600' },
  itemPrice: { fontSize: 18, fontWeight: '600', color: '#181725' },

  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  checkoutBtn: {
    backgroundColor: '#53B175',
    height: 67,
    borderRadius: 19,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  checkoutText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: '600', 
    flex: 2, 
    textAlign: 'center' 
  },
  priceBadge: {
    backgroundColor: '#489E67',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 65,
    alignItems: 'center'
  },
  badgeText: { color: 'white', fontSize: 12, fontWeight: '600' },

  customTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    borderTopWidth: 1,
    borderTopColor: '#F2F3F2',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    backgroundColor: 'white',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    color: '#181725',
  },
});