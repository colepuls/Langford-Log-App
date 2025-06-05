import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

const EMPLOYEE_DIRECTORY = Array.from({ length: 20 }, (_, i) => `Employee ${i + 1}`);

export default function LogEntryScreen({ route }) {
  const { userEmail } = route.params;
  const [foremanName, setForemanName] = useState('');
  const [foremanHours, setForemanHours] = useState({});
  const [date, setDate] = useState('');
  const [jobNumber, setJobNumber] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employeeHours, setEmployeeHours] = useState({});
  const [taskDescription, setTaskDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pickerValue, setPickerValue] = useState('');

  const handleAddEmployee = () => {
    if (
      pickerValue &&
      !selectedEmployees.includes(pickerValue) &&
      selectedEmployees.length < 20
    ) {
      setSelectedEmployees([...selectedEmployees, pickerValue]);
      setEmployeeHours({ ...employeeHours, [pickerValue]: '' });
      setPickerValue('');
    }
  };

  const handleRemoveEmployee = (employee) => {
    setSelectedEmployees(selectedEmployees.filter((e) => e !== employee));
    const updated = { ...employeeHours };
    delete updated[employee];
    setEmployeeHours(updated);
  };

  const updateHours = (employee, hours) => {
    setEmployeeHours({ ...employeeHours, [employee]: hours });
  };

  const handleSelectPhotos = async () => {
    if (photos.length >= 20) {
      alert('Maximum 20 photos allowed.');
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission required to access photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 10 - photos.length,
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhotos([...photos, ...result.assets]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    const employees = selectedEmployees.map((name) => ({
      name,
      hours: employeeHours[name] || '',
    }));

    formData.append('foreman', foremanName);
    formData.append('foremanHours', foremanHours);
    formData.append('date', date);
    formData.append('jobNumber', jobNumber);
    formData.append('employees', JSON.stringify(employees));
    formData.append('taskDescription', taskDescription);
    formData.append('userEmail', userEmail);

    photos.forEach((photo, index) => {
      formData.append('photos', {
        uri: photo.uri,
        name: `photo_${index + 1}.jpg`,
        type: 'image/jpeg',
      });
    });

    try {
      const response = await fetch(
          'https://langford-log-app.onrender.com/submit-log',
          { method: 'POST', body: formData },
      );

      const result = await response.json();
      console.log('API response:', result);
      alert('Log submitted successfully!');

      setForemanName('');
      setForemanHours({});
      setDate('');
      setJobNumber('');
      setSelectedEmployees([]);
      setEmployeeHours({});
      setTaskDescription('');
      setPhotos([]);
      setPickerValue('');
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit log.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.title}>Foreman Log Entry</Text>

              <Text style={styles.label}>Foreman:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter foreman name"
                value={foremanName}
                onChangeText={setForemanName}
              />

              <Text style={styles.label}>Foreman Hours:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter foreman hours"
                value={foremanHours}
                onChangeText={setForemanHours}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Date:</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/DD/YYYY"
                value={date}
                onChangeText={setDate}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Job #:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter job number"
                value={jobNumber}
                onChangeText={setJobNumber}
              />

              <Text style={styles.label}>Add Employee:</Text>
              <View style={styles.employeeAddRow}>
                <Picker
                  selectedValue={pickerValue}
                  style={{ flex: 1 }}
                  onValueChange={(itemValue) => setPickerValue(itemValue)}
                >
                  <Picker.Item label="Select employee..." value="" />
                  {EMPLOYEE_DIRECTORY.map((emp, idx) => (
                    <Picker.Item key={idx} label={emp} value={emp} />
                  ))}
                </Picker>
                <Button title="Add" onPress={handleAddEmployee} />
              </View>

              {selectedEmployees.map((emp, idx) => (
                <View key={idx} style={styles.employeeRow}>
                  <Text style={styles.employeeName}>{emp}</Text>
                  <TextInput
                    style={[styles.input, styles.hoursInput]}
                    placeholder="Hours"
                    keyboardType="numeric"
                    value={employeeHours[emp]}
                    onChangeText={(text) => updateHours(emp, text)}
                  />
                  <Pressable onPress={() => handleRemoveEmployee(emp)}>
                    <Text style={styles.removeButton}>delete</Text>
                  </Pressable>
                </View>
              ))}

              <Text style={styles.label}>Brief Description of Daily Task:</Text>
              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Describe today's tasks"
                multiline
                textAlignVertical="top"
                value={taskDescription}
                onChangeText={setTaskDescription}
              />

              <Text style={styles.label}>Add Photos:</Text>
              <Button title="Select Photos" onPress={handleSelectPhotos} />
              <View style={styles.previewContainer}>
                {photos.map((photo, index) => (
                  <Image
                    key={index}
                    source={{ uri: photo.uri }}
                    style={styles.previewImage}
                  />
                ))}
              </View>

              <View style={{ marginTop: 30, marginBottom: 50 }}>
                {loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <Button title="Submit Log" onPress={handleSubmit} />
                )}
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 30,
    paddingTop: 60,
    paddingBottom: Platform.OS === 'ios' ? 100 : 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
  },
  employeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  employeeName: {
    flex: 2,
    fontSize: 16,
  },
  hoursInput: {
    flex: 1,
  },
  removeButton: {
    fontSize: 20,
    color: 'red',
    paddingHorizontal: 10,
  },
  employeeAddRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  previewImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});
