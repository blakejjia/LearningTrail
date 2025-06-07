import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:learningtrail/models/account_data.dart';
import 'package:learningtrail/models/user.dart';

const String usersCollection = 'users';
const String accountsCollection = 'studnets';

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
    try {
      final user = await _firestore.collection(usersCollection).doc(uid).get();
      return MyUser.fromJson(user.data()!);
    } catch (e) {
      return null;
    }
  }

  Future<bool> updateUser(MyUser user) async {
    await _firestore
        .collection(usersCollection)
        .doc(user.uid)
        .update(user.toJson());
    return true;
  }

  Future<AccountData?> getAccount(String accountId) async {
    final account = await _firestore
        .collection(accountsCollection)
        .doc(accountId)
        .get();
    if (account.data() == null) {
      return null;
    }
    return AccountData.fromJson(account.data()!);
  }
}
