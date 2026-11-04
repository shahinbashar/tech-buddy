/// The signed-in user, as the domain sees it. Tokens never appear here:
/// the data layer persists them through `TokenManager`, and the app
/// reasons about the session through the session gate — never through
/// token values.
class UserEntity {
  const UserEntity({
    required this.id,
    required this.email,
    required this.fullName,
    required this.isAdmin,
    required this.hasPremium,
    this.phone,
  });

  final String id;
  final String email;
  final String fullName;
  final String? phone;
  final bool isAdmin;
  final bool hasPremium;

  String get firstName => fullName.split(' ').first;
}
