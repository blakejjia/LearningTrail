import 'package:bloc/bloc.dart';
import 'package:learningtrail/services/db_service.dart';
import 'package:learningtrail/services/auth_service.dart';
import 'package:learningtrail/models/user.dart';
import 'package:meta/meta.dart';
import 'dart:async';

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
        logout();
      }
    });
  }

  void login(MyUser user) {
    DbService().getUser(user.uid).then((dbuser) {
      if (dbuser != null) {
        user.setAvatarUrl(dbuser.avatarUrl);
        user.setName(dbuser.name);
      } else {
        DbService().addUser(user);
      }
    });

    emit(SystemLoggedIn(user: user));
  }

  void logout() {
    AuthService().signOut();
    emit(SystemNotLoggedIn());
  }
}
