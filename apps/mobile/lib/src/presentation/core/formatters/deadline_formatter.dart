import '../../../domain/entities/circular_entity.dart';

enum DeadlineKind { closed, upcoming, closesToday, urgent, open }

/// What to tell the candidate about a circular's deadline. Pure and
/// clock-injected so it can be unit tested.
class DeadlineInfo {
  const DeadlineInfo(this.kind, {this.daysLeft = 0});

  final DeadlineKind kind;
  final int daysLeft;
}

DeadlineInfo deadlineInfo({
  required CircularStatus status,
  required DateTime deadline,
  DateTime? now,
}) {
  final current = now ?? DateTime.now();
  if (status == CircularStatus.closed || !deadline.isAfter(current)) {
    return const DeadlineInfo(DeadlineKind.closed);
  }
  if (status == CircularStatus.upcoming) {
    return const DeadlineInfo(DeadlineKind.upcoming);
  }
  final days = deadline.difference(current).inDays;
  if (days < 1) return const DeadlineInfo(DeadlineKind.closesToday);
  return DeadlineInfo(
    days <= 3 ? DeadlineKind.urgent : DeadlineKind.open,
    daysLeft: days,
  );
}

/// "mm:ss" (or "h:mm:ss") for the exam countdown.
String formatClock(int totalSeconds) {
  final seconds = totalSeconds < 0 ? 0 : totalSeconds;
  final h = seconds ~/ 3600;
  final m = (seconds % 3600) ~/ 60;
  final s = seconds % 60;
  String two(int v) => v.toString().padLeft(2, '0');
  return h > 0 ? '$h:${two(m)}:${two(s)}' : '${two(m)}:${two(s)}';
}

/// Drops a trailing ".0" so marks read naturally (4 instead of 4.0).
String formatNumber(double value) => value == value.roundToDouble()
    ? value.toInt().toString()
    : value.toStringAsFixed(2);
