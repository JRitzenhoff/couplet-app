package handler

import (
	"context"
	"couplet/internal/api"
	"couplet/internal/database/event_id"
	"couplet/internal/database/event_swipe"
	"couplet/internal/database/user_id"
	"couplet/internal/database/user_swipe"
	"errors"
)

func (h Handler) EventsSwipesPost(ctx context.Context, req *api.EventSwipe) (api.EventsSwipesPostRes, error) {
	h.logger.Info("POST /events/swipes")
	var eventSwipeToCreate event_swipe.EventSwipe
	eventSwipeToCreate.UserID = user_id.UserID(req.UserId)
	eventSwipeToCreate.EventID = event_id.EventID(req.EventId)
	eventSwipeToCreate.Liked = req.Liked

	es, valErr, txErr := h.controller.CreateEventSwipe(eventSwipeToCreate)
	if valErr != nil || txErr != nil {
		return nil, errors.New("failed to create event swipe")
	}

	res := api.EventSwipe{
		UserId:  es.UserID.Unwrap(),
		EventId: es.EventID.Unwrap(),
		Liked:   es.Liked,
	}

	return &res, nil
}

func (h Handler) UsersSwipesPost(ctx context.Context, req *api.UserSwipe) (api.UsersSwipesPostRes, error) {
	h.logger.Info("POST /users/swipes")
	var userSwipeToCreate user_swipe.UserSwipe
	userSwipeToCreate.UserID = user_id.UserID(req.UserId)
	userSwipeToCreate.OtherUserID = user_id.UserID(req.OtherUserId)
	userSwipeToCreate.Liked = req.Liked

	us, valErr, txErr := h.controller.CreateUserSwipe(userSwipeToCreate)
	if valErr != nil || txErr != nil {
		if valErr != nil {
			h.logger.Info(valErr.Error())
		}
		return nil, errors.New("failed to create user swipe")
	}

	res := api.UserSwipe{
		UserId:      us.UserID.Unwrap(),
		OtherUserId: us.OtherUserID.Unwrap(),
		Liked:       us.Liked,
	}

	return &res, nil
}
