import 'package:fluttertoast/fluttertoast.dart';
import 'package:learningtrail/models/account_data.dart';
import 'package:learningtrail/services/db_service.dart';
import 'package:learningtrail/services/auth_service.dart';
import 'package:learningtrail/models/user.dart';
import 'dart:async';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'system_state.dart';

class SystemCubit extends Cubit<SystemState> {
  SystemCubit() : super(SystemNotLoggedIn()) {
    listenToAuthChanges();
  }

  StreamSubscription? _authSubscription;

  @override
  Future<void> close() {
    _authSubscription?.cancel();
    return super.close();
  }

  void listenToAuthChanges() {
    _authSubscription?.cancel();
    _authSubscription = AuthService().authStateChanges.listen((user) {
      if (user != null) {
        login(
          MyUser(
            uid: user.uid,
            email: user.email!,
            createdAt: user.metadata.creationTime!,
            avatarUrl: user.photoURL,
            name: user.displayName,
          ),
        );
      } else {
        emit(SystemNotLoggedIn());
      }
    });
  }

  void connectAccount(String? accountId) {
    if (accountId == null) {
      emit(SystemLoggedIn(user: (state as SystemLoggedIn).user));
      return;
    }
    DbService().getAccount(accountId).then((account) {
      if (account != null && state is SystemLoggedIn) {
        emit(
          SystemAccountConnected(
            user: (state as SystemLoggedIn).user,
            accountData: account,
          ),
        );
      } else {
        Fluttertoast.showToast(msg: "Account not found");
      }
    });
  }

  void login(MyUser user) {
    DbService().getUser(user.uid).then((dbuser) {
      if (dbuser != null) {
        user = dbuser;
        emit(SystemLoggedIn(user: dbuser));
        connectAccount(dbuser.connectedAccount);
      } else {
        DbService().addUser(user);
        emit(SystemLoggedIn(user: user));
      }
    });
  }

  void logout() {
    AuthService().signOut();
  }
}
