part of 'system_cubit.dart';

@immutable
abstract class SystemState {}

class SystemNotLoggedIn extends SystemState {}

class SystemLoggedIn extends SystemState {
  final MyUser user;

  SystemLoggedIn({required this.user});
}

class SystemAccountConnected extends SystemState {}
