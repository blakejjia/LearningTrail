part of 'system_cubit.dart';

abstract class SystemState {}

class SystemNotLoggedIn extends SystemState {}

class SystemLoggedIn extends SystemState {
  final MyUser user;

  SystemLoggedIn({required this.user});
}

class SystemAccountConnected extends SystemLoggedIn {
  final AccountData accountData;
  SystemAccountConnected({required super.user, required this.accountData});
}
