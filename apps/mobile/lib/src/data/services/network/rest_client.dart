import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

import 'endpoints.dart';
import 'request_auth.dart';

part 'rest_client.g.dart';

/// Retrofit client for the Tech Buddy API. Every endpoint that needs a
/// session carries `@Extra({requestAuthKey: RequestAuth.protected})` so the
/// auth interceptor attaches the bearer token and the refresh interceptor
/// replays the request after a 401.
@RestApi()
abstract class RestClient {
  factory RestClient(
    Dio dio, {
    String? baseUrl,
    ParseErrorLogger? errorLogger,
  }) = _RestClient;

  // ── Auth ──
  @POST(Endpoints.login)
  Future<HttpResponse> login(@Body() Map<String, dynamic> request);

  @POST(Endpoints.register)
  Future<HttpResponse> register(@Body() Map<String, dynamic> request);

  @Extra({requestAuthKey: RequestAuth.protected})
  @GET(Endpoints.currentUser)
  Future<HttpResponse> currentUser();

  // ── Dashboard ──
  @Extra({requestAuthKey: RequestAuth.protected})
  @GET(Endpoints.dashboard)
  Future<HttpResponse> dashboard();

  // ── Circulars ──
  @Extra({requestAuthKey: RequestAuth.protected})
  @GET(Endpoints.circulars)
  Future<HttpResponse> circulars({
    @Query('status') required String status,
    @Query('page') required int page,
    @Query('pageSize') required int pageSize,
    @Query('search') String? search,
  });

  @Extra({requestAuthKey: RequestAuth.protected})
  @GET(Endpoints.savedCirculars)
  Future<HttpResponse> savedCirculars();

  @Extra({requestAuthKey: RequestAuth.protected})
  @GET(Endpoints.circularDetail)
  Future<HttpResponse> circularDetail(@Path('slug') String slug);

  @Extra({requestAuthKey: RequestAuth.protected})
  @PUT(Endpoints.circularSave)
  Future<HttpResponse> saveCircular(@Path('id') String id);

  @Extra({requestAuthKey: RequestAuth.protected})
  @DELETE(Endpoints.circularSave)
  Future<HttpResponse> unsaveCircular(@Path('id') String id);

  // ── Study ──
  @Extra({requestAuthKey: RequestAuth.protected})
  @GET(Endpoints.subjects)
  Future<HttpResponse> subjects();

  @Extra({requestAuthKey: RequestAuth.protected})
  @GET(Endpoints.subjectDetail)
  Future<HttpResponse> subjectDetail(@Path('slug') String slug);

  @Extra({requestAuthKey: RequestAuth.protected})
  @GET(Endpoints.topicDetail)
  Future<HttpResponse> topicDetail(
    @Path('subjectSlug') String subjectSlug,
    @Path('topicSlug') String topicSlug,
  );

  @Extra({requestAuthKey: RequestAuth.protected})
  @POST(Endpoints.topicComplete)
  Future<HttpResponse> completeTopic(@Path('id') String topicId);

  @Extra({requestAuthKey: RequestAuth.protected})
  @DELETE(Endpoints.topicComplete)
  Future<HttpResponse> uncompleteTopic(@Path('id') String topicId);

  // ── Exams ──
  @Extra({requestAuthKey: RequestAuth.protected})
  @GET(Endpoints.todayExams)
  Future<HttpResponse> todayExams();

  @Extra({requestAuthKey: RequestAuth.protected})
  @POST(Endpoints.startExam)
  Future<HttpResponse> startExam(@Path('id') String examId);

  @Extra({requestAuthKey: RequestAuth.protected})
  @GET(Endpoints.leaderboard)
  Future<HttpResponse> leaderboard(@Path('id') String examId);

  @Extra({requestAuthKey: RequestAuth.protected})
  @GET(Endpoints.attempt)
  Future<HttpResponse> attempt(@Path('id') String attemptId);

  @Extra({requestAuthKey: RequestAuth.protected})
  @PUT(Endpoints.attemptAnswers)
  Future<HttpResponse> saveAnswer(
    @Path('id') String attemptId,
    @Body() Map<String, dynamic> body,
  );

  @Extra({requestAuthKey: RequestAuth.protected})
  @POST(Endpoints.attemptSubmit)
  Future<HttpResponse> submitAttempt(
    @Path('id') String attemptId,
    @Body() Map<String, dynamic> body,
  );

  @Extra({requestAuthKey: RequestAuth.protected})
  @POST(Endpoints.practice)
  Future<HttpResponse> startPractice(@Body() Map<String, dynamic> body);
}
