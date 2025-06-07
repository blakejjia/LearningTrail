import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:learningtrail/models/user.dart';

const String usersCollection = 'users';
const String studentsCollection = 'students';

class DbService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<bool> addUser(MyUser user) async {
    await _firestore
        .collection(usersCollection)
        .doc(user.uid)
        .set(user.toJson());
    return true;
  }

  Future<MyUser?> getUser(String uid) async {
    final user = await _firestore.collection(usersCollection).doc(uid).get();
    if (user.data() == null) {
      return null;
    }
    return MyUser.fromJson(user.data()!);
  }

  Future<bool> updateUser(MyUser user) async {
    await _firestore
        .collection(usersCollection)
        .doc(user.uid)
        .update(user.toJson());
    return true;
  }
}
