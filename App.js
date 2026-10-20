import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
} from 'react-native';

class DisplayCard extends Component {
  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <View style={styles.helloCard}>
        <Text style={styles.helloText}>{this.props.text}</Text>
      </View>
    );
  }
}

class ActionButton extends Component {
  render() {
    const { label, color, onPress } = this.props;
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPress={onPress}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

export default class App extends Component {
  // ===== STATE =====
  state = {
    showHello: false,
    inputText: '',
    submittedText: '',
  };

  // ===== METHOD =====
  toggleHello = () => {
    this.setState({ showHello: !this.state.showHello });
  };

  handleChangeText = (text) => {
    this.setState({ inputText: text });
  };

  handleSubmit = () => {
    if (this.state.inputText.trim() === '') {
      Alert.alert('Peringatan', 'Teks tidak boleh kosong');
      return;
    }
    this.setState({ submittedText: this.state.inputText, inputText: '' });
  };

  showInfo = () => {
    Alert.alert('Info', 'Modul III: Props, State, Method');
  };

  render() {
    const { showHello, inputText, submittedText } = this.state;

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#F1F3F5" />
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled">
            {/* Header */}
            <View style={styles.card}>
              <TouchableOpacity style={styles.gear} onPress={this.showInfo}>
                <Text style={styles.gearIcon}>⚙</Text>
              </TouchableOpacity>
              <Text style={styles.modul}>MODUL III</Text>
              <Text style={styles.judul}>Props, State, Method</Text>
              <Text style={styles.sub}>Tugas Mandiri Pemrograman Mobile</Text>
            </View>

            {/* Tugas 1 */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Tugas 1: Toggle Hello World</Text>
              <ActionButton
                label={showHello ? 'Sembunyikan' : 'Tampilkan'}
                color="#3B5BDB"
                onPress={this.toggleHello}
              />
              <DisplayCard visible={showHello} text="Hello World" />
            </View>

            {/* Tugas 2 */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Tugas 2: Input & Submit Text</Text>
              <TextInput
                style={styles.input}
                placeholder="Ketik teks di sini..."
                placeholderTextColor="#9AA0A6"
                value={inputText}
                onChangeText={this.handleChangeText}
              />
              <ActionButton
                label="Submit"
                color="#3E8E6A"
                onPress={this.handleSubmit}
              />
              <View style={styles.resultBox}>
                <Text
                  style={submittedText ? styles.resultText : styles.resultEmpty}>
                  {submittedText ? submittedText : 'Belum ada data yang disubmit'}
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: {
    flex: 1,
    backgroundColor: '#F1F3F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: { padding: 16, paddingTop: 16, paddingBottom: 32 },
  card: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#212529', marginBottom: 12 },
  gear: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#CED4DA',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  gearIcon: { fontSize: 18, color: '#fff' },
  modul: { textAlign: 'center', fontSize: 11, fontWeight: 'bold', color: '#1C7ED6', letterSpacing: 1 },
  judul: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#212529', marginTop: 4 },
  sub: { textAlign: 'center', fontSize: 12, color: '#6C757D', marginTop: 4 },
  button: { borderRadius: 10, paddingVertical: 13, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  helloCard: {
    marginTop: 12,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#E7F5FF',
    alignItems: 'center',
  },
  helloText: { fontSize: 22, fontWeight: 'bold', color: '#1864AB' },
  input: {
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: '#F8F9FA',
    color: '#212529',
  },
  resultBox: {
    marginTop: 12,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  resultEmpty: { fontSize: 12, color: '#9AA0A6' },
  resultText: { fontSize: 16, fontWeight: 'bold', color: '#212529' },
});